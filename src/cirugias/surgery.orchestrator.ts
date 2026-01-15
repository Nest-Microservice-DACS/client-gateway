import { Injectable } from '@nestjs/common';
import { PatientClient } from 'src/pacientes/clients/patient.client';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { forkJoin } from 'rxjs';
import { SurgeryClient } from './clients/surgery.client';
import {
  AddDoctorsSurgeryDto,
  CreateSurgeryDto,
  RemoveDoctorsSurgeryDto,
  UpdateSurgeryDto,
} from './dto';
import { PaginationDto } from 'src/common';
import { OperatingRoomClient } from 'src/quirofanos/clients/operating-room.client';
import { ServiciosClient } from 'src/servicios/clients/service.client';
import { ScheduleClient } from 'src/agenda/clients/shift.client';
import { CirugiaResponseDto } from './dto/surgery-response.dto';
import { ServiceResponseDto } from 'src/servicios/dto/service-response.dto';
import { PersonalClient } from 'src/personal/clients/personal.client';

// IMPLEMENTAR: event bus / message broker (ej. RabbitMQ, Kafka, NATS) para mejorar la comunicacion entre microservicios y desacoplarlos

// Servicio orquestador que coordina operaciones de cirugías con otros microservicios
@Injectable()
export class SurgeryOrchestrator {
  // Inyectar clientes de diferentes módulos para coordinar llamadas
  constructor(
    private readonly surgeryClient: SurgeryClient,
    private readonly pacientesClient: PatientClient,
    private readonly quirofanosClient: OperatingRoomClient,
    private readonly serviciosClient: ServiciosClient,
    private readonly agendaClient: ScheduleClient,
    private readonly personalClient: PersonalClient,
  ) {}

  // Crea una cirugía: verifica disponibilidad del quirófano, obtiene duración del servicio y crea el turno
  createSurgery(createSurgeryDto: CreateSurgeryDto) {
    return this.serviciosClient
      .getServiceById(createSurgeryDto.serviceId)
      .pipe(
        map((servicio: ServiceResponseDto) => servicio.duration),
        switchMap((tiempoEstimado: number) => {
          return this.agendaClient
            .getAllShifts({
              startDate: createSurgeryDto.date,
              endDate: createSurgeryDto.date,
              operatingRoomId: createSurgeryDto.operatingRoomId,
            })
            .pipe(
              switchMap((turnosExistentes: any[]) => {
                // Si hay turnos existentes, no se puede crear la cirugía
                if (turnosExistentes.length > 0) {
                  throw new Error(
                    'Ya existe un turno para este quirófano en la fecha seleccionada.',
                  );
                }
                // Si no hay turnos, crear la cirugía y luego el turno
                return this.surgeryClient.createSurgery(createSurgeryDto).pipe(
                  switchMap((cirugiaCreated: CirugiaResponseDto) => {
                    const startDate = new Date(createSurgeryDto.date);
                    const endDate = new Date(
                      startDate.getTime() + tiempoEstimado * 60000,
                    );
                    const endTime = endDate.toISOString();

                    return this.agendaClient
                      .createShift({
                        surgeryId: cirugiaCreated.id,
                        operatingRoomId: createSurgeryDto.operatingRoomId,
                        startTime: startDate.toISOString(),
                        endTime: endTime,
                      })
                      .pipe(
                        map((shiftCreated) => ({
                          surgery: cirugiaCreated,
                          shift: shiftCreated,
                        })),
                      );
                  }),
                );
              }),
            );
        }),
      );
  }

  // Obtiene todas las cirugías y enriquece cada una con datos de paciente, quirófano y servicio
  getAllSurgeries(paginationDto: PaginationDto) {
    return this.surgeryClient.getAllSurgeries(paginationDto).pipe(
      switchMap((result: any) => {
        // Normalizar la respuesta: puede venir como array o con data/items
        const cirugias = Array.isArray(result)
          ? result
          : result.data || result.items;

        if (!cirugias || !cirugias.length) {
          return [result];
        }

        // Obtener todos los IDs de médicos únicos de todas las cirugías
        const allMedicoIds = [
          ...new Set(
            cirugias.flatMap((c: any) =>
              (c.surgeryMedicos || []).map((cm: any) => cm.medicoId),
            ),
          ),
        ];

        return this.personalClient
          .getPersonalByIds(allMedicoIds as number[])
          .pipe(
            switchMap((allMedicos: any[]) => {
              const cirugiasWithRelations$ = cirugias.map((surgery: any) => {
                const surgeryMedicosList = surgery.surgeryMedicos || [];
                const medicosConRol = surgeryMedicosList
                  .map((relacion: any) => {
                    const medico = (allMedicos || []).find(
                      (m: any) => m.id === relacion.medicoId,
                    );
                    return medico ? { ...medico, rol: relacion.rol } : null;
                  })
                  .filter(Boolean);
                return forkJoin({
                  paciente: this.pacientesClient
                    .getPatientById(surgery.pacienteId)
                    .pipe(catchError(() => of(null))),
                  quirofano: this.quirofanosClient
                    .getOperatingRoomById(surgery.quirofanoId)
                    .pipe(catchError(() => of(null))),
                  servicio: this.serviciosClient
                    .getServiceById(surgery.servicioId)
                    .pipe(catchError(() => of(null))),
                }).pipe(
                  map(({ paciente, quirofano, servicio }) => {
                    const {
                      pacienteId,
                      quirofanoId,
                      servicioId,
                      surgeryMedicos,
                      ...rest
                    } = surgery;
                    return {
                      ...rest,
                      paciente,
                      quirofano,
                      servicio,
                      medicos: medicosConRol,
                    };
                  }),
                );
              });
              // Ejecutar todas las llamadas en paralelo y devolver el array completo
              return forkJoin(cirugiasWithRelations$).pipe(
                map((mappedCirugias) =>
                  Array.isArray(result)
                    ? mappedCirugias
                    : { ...result, data: mappedCirugias },
                ),
              );
            }),
          );
      }),
    );
  }

  // Obtiene una cirugía por ID y la enriquece con datos de paciente, quirófano y servicio
  getSurgeryById(id: number) {
    const { of } = require('rxjs');

    return this.surgeryClient.getSurgeryById(id).pipe(
      switchMap((surgery: any) =>
        forkJoin({
          // Mapear paciente, quirófano y servicio de forma paralela, ignorando errores
          paciente: this.pacientesClient
            .getPatientById(surgery.pacienteId)
            .pipe(catchError(() => of(null))),
          quirofano: this.quirofanosClient
            .getOperatingRoomById(surgery.quirofanoId)
            .pipe(catchError(() => of(null))),
          servicio: this.serviciosClient
            .getServiceById(surgery.servicioId)
            .pipe(catchError(() => of(null))),
          medicos: this.personalClient
            .getPersonalByIds(
              surgery.surgeryMedicos.map((cm: any) => cm.medicoId),
            )
            .pipe(catchError(() => of(null))),
        }).pipe(
          map(({ paciente, quirofano, servicio, medicos }) => {
            const surgeryMedicosList = surgery.surgeryMedicos || [];
            const medicosArray = Array.isArray(medicos) ? medicos : [];
            const medicosConRol = surgeryMedicosList
              .map((relacion: any) => {
                const medico = medicosArray.find(
                  (m: any) => m.id === relacion.medicoId,
                );
                return medico ? { ...medico, rol: relacion.rol } : null;
              })
              .filter(Boolean);
            const {
              pacienteId,
              quirofanoId,
              servicioId,
              surgeryMedicos,
              ...rest
            } = surgery;
            return {
              ...rest,
              paciente,
              quirofano,
              servicio,
              medicos: medicosConRol,
            };
          }),
        ),
      ),
    );
  }

  // Actualiza una cirugía existente
  updateSurgery(id: number, updateSurgeryDto: UpdateSurgeryDto) {
    return this.surgeryClient.updateSurgery(id, updateSurgeryDto);
  }

  // Elimina una cirugía y sus turnos asociados
  deleteSurgery(id: number) {
    // Primero eliminar turnos asociados
    return this.agendaClient.deleteShift(id).pipe(
      switchMap(() =>
        // Luego eliminar la cirugía
        this.surgeryClient.deleteSurgery(id).pipe(
          map(() => ({
            message: `Cirugía ${id} y sus turnos fueron eliminados`,
          })),
        ),
      ),
    );
  }

  addDoctorsToSurgery(surgeryId: number, addDoctorsDto: AddDoctorsSurgeryDto) {
    return this.surgeryClient.addDoctorsToSurgery(surgeryId, addDoctorsDto);
  }

  removeDoctorsFromSurgery(
    surgeryId: number,
    removeDoctorsDto: RemoveDoctorsSurgeryDto,
  ) {
    return this.surgeryClient.removeDoctorsFromSurgery(
      surgeryId,
      removeDoctorsDto,
    );
  }
}
