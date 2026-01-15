import { Injectable } from '@nestjs/common';
import { PacientesClient } from 'src/pacientes/clients/pacientes.client';
import { map, Observable, switchMap } from 'rxjs';
import { forkJoin } from 'rxjs';
import { CirugiasClient } from './clients/cirugias.client';
import {
  AddMedicosCirugiaDto,
  CreateCirugiaDto,
  RemoveMedicosCirugiaDto,
  UpdateCirugiaDto,
} from './dto';
import { PaginationDto } from 'src/common';
import { QuirofanosClient } from 'src/quirofanos/clients/quirofanos.client';
import { ServiciosClient } from 'src/servicios/clients/servicios.client';
import { AgendaClient } from 'src/agenda/clients/agenda.client';
import { CirugiaResponseDto } from './dto/cirugia-response.dto';
import { ServicioResponseDto } from 'src/servicios/dto/servicio-response.dto';

// IMPLEMENTAR: event bus / message broker (ej. RabbitMQ, Kafka, NATS) para mejorar la comunicacion entre microservicios y desacoplarlos

// Servicio orquestador que coordina operaciones de cirugías con otros microservicios
@Injectable()
export class CirugiasOrchestrator {
  // Inyectar clientes de diferentes módulos para coordinar llamadas
  constructor(
    private readonly cirugiasClient: CirugiasClient,
    private readonly pacientesClient: PacientesClient,
    private readonly quirofanosClient: QuirofanosClient,
    private readonly serviciosClient: ServiciosClient,
    private readonly agendaClient: AgendaClient,
  ) {}

  // Crea una cirugía: verifica disponibilidad del quirófano, obtiene duración del servicio y crea el turno
  createCirugia(createCirugiaDto: CreateCirugiaDto) {
    return this.serviciosClient
      .getServicioById(createCirugiaDto.servicioId)
      .pipe(
        map((servicio: ServicioResponseDto) => servicio.duracion),
        switchMap((tiempoEstimado: number) => {
          return this.agendaClient
            .getAllTurnos({
              fechaInicio: createCirugiaDto.fecha,
              fechaFin: createCirugiaDto.fecha,
              quirofanoId: createCirugiaDto.quirofanoId,
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
                return this.cirugiasClient.createCirugia(createCirugiaDto).pipe(
                  switchMap((cirugiaCreated: CirugiaResponseDto) => {
                    const startDate = new Date(createCirugiaDto.fecha);
                    const endDate = new Date(
                      startDate.getTime() + tiempoEstimado * 60000,
                    );
                    const endTime = endDate.toISOString();

                    return this.agendaClient
                      .createTurno({
                        cirugiaId: cirugiaCreated.id,
                        quirofanoId: createCirugiaDto.quirofanoId,
                        startTime: startDate.toISOString(),
                        endTime: endTime,
                      })
                      .pipe(
                        map((turnoCreado) => ({
                          cirugia: cirugiaCreated,
                          turno: turnoCreado,
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
  getAllCirugias(paginationDto: PaginationDto) {
    return this.cirugiasClient.getAllCirugias(paginationDto).pipe(
      switchMap((result: any) => {
        // Normalizar la respuesta: puede venir como array o con data/items
        const cirugias = Array.isArray(result)
          ? result
          : result.data || result.items;

        if (!cirugias || !cirugias.length) {
          return [result];
        }

        // Generar observables para mapear paciente, quirófano y servicio en paralelo
        const { of } = require('rxjs');
        const { catchError } = require('rxjs/operators');
        const cirugiasWithRelations$ = cirugias.map((cirugia: any) =>
          forkJoin({
            paciente: this.pacientesClient
              .getPacienteById(cirugia.pacienteId)
              .pipe(catchError(() => of(null))),
            quirofano: this.quirofanosClient
              .getQuirofanoById(cirugia.quirofanoId)
              .pipe(catchError(() => of(null))),
            servicio: this.serviciosClient
              .getServicioById(cirugia.servicioId)
              .pipe(catchError(() => of(null))),
          }).pipe(
            map(({ paciente, quirofano, servicio }) => {
              const { pacienteId, quirofanoId, servicioId, ...rest } = cirugia;
              return {
                ...rest,
                paciente,
                quirofano,
                servicio,
              };
            }),
          ),
        );

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
  }

  // Obtiene una cirugía por ID y la enriquece con datos de paciente, quirófano y servicio
  getCirugiaById(id: number) {
    const { of } = require('rxjs');
    const { catchError } = require('rxjs/operators');
    return this.cirugiasClient.getCirugiaById(id).pipe(
      switchMap((cirugia: any) =>
        forkJoin({
          // Mapear paciente, quirófano y servicio de forma paralela, ignorando errores
          paciente: this.pacientesClient
            .getPacienteById(cirugia.pacienteId)
            .pipe(catchError(() => of(null))),
          quirofano: this.quirofanosClient
            .getQuirofanoById(cirugia.quirofanoId)
            .pipe(catchError(() => of(null))),
          servicio: this.serviciosClient
            .getServicioById(cirugia.servicioId)
            .pipe(catchError(() => of(null))),
        }).pipe(
          map(({ paciente, quirofano, servicio }) => {
            const { pacienteId, quirofanoId, servicioId, ...rest } = cirugia;
            return {
              ...rest,
              paciente,
              quirofano,
              servicio,
            };
          }),
        ),
      ),
    );
  }

  // Actualiza una cirugía existente
  updateCirugia(id: number, updateCirugiaDto: UpdateCirugiaDto) {
    return this.cirugiasClient.updateCirugia(id, updateCirugiaDto);
  }

  // Elimina una cirugía y sus turnos asociados
  deleteCirugia(id: number) {
    // Primero eliminar turnos asociados
    return this.agendaClient.deleteTurno(id).pipe(
      switchMap(() =>
        // Luego eliminar la cirugía
        this.cirugiasClient.deleteCirugia(id).pipe(
          map(() => ({
            message: `Cirugía ${id} y sus turnos fueron eliminados`,
          })),
        ),
      ),
    );
  }

  addMedicosToCirugia(cirugiaId: number, addMedicosDto: AddMedicosCirugiaDto) {
    return this.cirugiasClient.addMedicosToCirugia(cirugiaId, addMedicosDto);
  }

  removeMedicosFromCirugia(cirugiaId: number, removeMedicosDto: RemoveMedicosCirugiaDto) {
    return this.cirugiasClient.removeMedicosFromCirugia(cirugiaId, removeMedicosDto);
  }
}
