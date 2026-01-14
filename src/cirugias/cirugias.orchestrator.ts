import { Injectable } from '@nestjs/common';
import { PacientesClient } from 'src/pacientes/clients/pacientes.client';
import { map, Observable, switchMap } from 'rxjs';
import { from } from 'rxjs';
import { catchError, toArray } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { CirugiasClient } from './clients/cirugias.client';
import { CreateCirugiaDto, UpdateCirugiaDto } from './dto';
import { PaginationDto } from 'src/common';
import { any } from 'joi';
import { QuirofanosClient } from 'src/quirofanos/clients/quirofanos.client';
import { ServiciosClient } from 'src/servicios/clients/servicios.client';
import { AgendaClient } from 'src/agenda/clients/agenda.client';
import { CirugiaResponseDto } from './dto/cirugia-response.dto';
import { ServicioResponseDto } from 'src/servicios/dto/servicio-response.dto';

@Injectable()
export class CirugiasOrchestrator {
  constructor(
    private readonly cirugiasClient: CirugiasClient,
    private readonly pacientesClient: PacientesClient,
    private readonly quirofanosClient: QuirofanosClient,
    private readonly serviciosClient: ServiciosClient,
    private readonly agendaClient: AgendaClient,
  ) {}

  createCirugia(createCirugiaDto: CreateCirugiaDto) {
    return this.serviciosClient.getServicioById(createCirugiaDto.servicioId).pipe(
      map((servicio: ServicioResponseDto) => servicio.duracion),
      switchMap((tiempoEstimado: number) => {
        return this.agendaClient.getAllTurnos({
          fechaInicio: createCirugiaDto.fecha,
          fechaFin: createCirugiaDto.fecha,
          quirofanoId: createCirugiaDto.quirofanoId,
        }).pipe(
          switchMap((turnosExistentes: any[]) => {
            // Si hay turnos existentes, no se puede crear la cirugía
            if (turnosExistentes.length > 0) {
              throw new Error('Ya existe un turno para este quirófano en la fecha seleccionada.');
            }
            // Si no hay turnos, crear la cirugía y luego el turno
            return this.cirugiasClient.createCirugia(createCirugiaDto).pipe(
              switchMap((cirugiaCreated: CirugiaResponseDto) => {
                const startDate = new Date(createCirugiaDto.fecha);
                const endDate = new Date(startDate.getTime() + tiempoEstimado * 60000);
                const endTime = endDate.toISOString();

                return this.agendaClient.createTurno({
                  cirugiaId: cirugiaCreated.id,
                  quirofanoId: createCirugiaDto.quirofanoId,
                  startTime: startDate.toISOString(),
                  endTime: endTime,
                }).pipe(
                  map((turnoCreado) => ({
                    cirugia: cirugiaCreated,
                    turno: turnoCreado,
                  }))
                );
              })
            );
          })
        );
      })
    );
  }

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

        // Generar un array de observables para cada cirugía, mapeando paciente, quirofano y servicio
        const cirugiasWithRelations$ = cirugias.map((cirugia: any) =>
          forkJoin({
            paciente: this.pacientesClient.getPacienteById(cirugia.pacienteId),
            quirofano: this.quirofanosClient.getQuirofanoById(
              cirugia.quirofanoId,
            ),
            servicio: this.serviciosClient.getServicioById(cirugia.servicioId),
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

  getCirugiaById(id: number) {
    return this.cirugiasClient.getCirugiaById(id).pipe(
      switchMap((cirugia: any) =>
        forkJoin({
          paciente: this.pacientesClient.getPacienteById(cirugia.pacienteId),
          quirofano: this.quirofanosClient.getQuirofanoById(
            cirugia.quirofanoId,
          ),
          servicio: this.serviciosClient.getServicioById(cirugia.servicioId),
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

  updateCirugia(id: number, updateCirugiaDto: UpdateCirugiaDto) {
    return this.cirugiasClient.updateCirugia(id, updateCirugiaDto);
  }

  deleteCirugia(id: number) {
    return this.cirugiasClient.deleteCirugia(id);
  }
}
