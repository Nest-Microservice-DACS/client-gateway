import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateCirugiaDto } from './dto/create-cirugia.dto';
import { UpdateCirugiaDto } from './dto/update-cirugia.dto';
import { PaginationDto } from 'src/common';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class CirugiasService {
  constructor(
    @Inject('CIRUGIAS_SERVICE') private readonly cirugiasClient: ClientProxy,
    @Inject('PACIENTES_SERVICE') private readonly pacientesClient: ClientProxy,
    // @Inject('SERVICIOS_SERVICE') private readonly serviciosClient: ClientProxy,
    // @Inject('QUIROFANOS_SERVICE')
    //private readonly quirofanosClient: ClientProxy,
  ) {}

  getCirugiaById(id: number): Observable<any> {
    return this.cirugiasClient.send({ cmd: 'get_cirugia_by_id' }, { id }).pipe(
      switchMap((cirugia: any) =>
        forkJoin({
          paciente: this.pacientesClient.send(
            { cmd: 'get_paciente_by_id' },
            cirugia.pacienteId,
          ),
          //   servicio: this.serviciosClient.send(
          //     { cmd: 'get_servicio_by_id' },
          //     cirugia.servicioId ,
          //   ),
          //   quirofano: this.quirofanosClient.send(
          //     { cmd: 'get_quirofano_by_id' },
          //     cirugia.quirofanoId,
          //   ),
        }).pipe(
          map(({ paciente }) => ({
            //map(({ paciente, servicio, quirofano }) => ({
            ...cirugia,
            paciente,
            // servicio,
            // quirofano,
          })),
        ),
      ),
    );
  }

  createCirugia(dto: CreateCirugiaDto) {
    return this.cirugiasClient.send({ cmd: 'create_cirugia' }, dto);
  }

  getAllCirugias(paginationDto: PaginationDto) {
    return this.cirugiasClient.send({ cmd: 'get_cirugias' }, paginationDto);
  }

  updateCirugia(id: number, dto: UpdateCirugiaDto) {
    return this.cirugiasClient.send({ cmd: 'update_cirugia' }, { id, ...dto });
  }

  deleteCirugia(id: number) {
    return this.cirugiasClient.send({ cmd: 'delete_cirugia' }, { id });
  }
}
