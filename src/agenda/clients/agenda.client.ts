import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AGENDA_SERVICE } from 'src/config';
import { CreateTurnoDto } from '../dto/create-turno.dto';
import { UpdateTurnoDto } from '../dto/update-turno.dto';
import { ChangeTurnoStatusDto } from '../dto/change-turno-status.dto';
import { TurnoPaginationDto } from '../dto/turno-pagination.dto';

@Injectable()
export class AgendaClient {
  
  constructor(
    @Inject(AGENDA_SERVICE)
    private readonly agendaClient: ClientProxy,
  ) {}

  createTurno(createTurnoDto: CreateTurnoDto) {
    return this.agendaClient.send({ cmd: 'create_turno' }, createTurnoDto);
  }

  getAllTurnos(turnoPaginationDto: TurnoPaginationDto) {
    return this.agendaClient.send({ cmd: 'get_turnos' }, turnoPaginationDto);
  }

  getTurnoById(cirugiaId: number) {
    return this.agendaClient.send({ cmd: 'get_turno_by_cirugia_id' }, cirugiaId);
  }

  updateTurno(id: number, updateTurnoDto: UpdateTurnoDto) {
    return this.agendaClient.send({ cmd: 'update_turno' }, updateTurnoDto);
  }

  deleteTurno(cirugiaId: number) {
    return this.agendaClient.send({ cmd: 'remove_turno' }, cirugiaId);
  }

//     changeTurnoStatus(id: number, changeTurnoStatusDto: ChangeTurnoStatusDto) {
//     return this.agendaClient.send(
//       { cmd: 'change_turno_status' },
//       changeTurnoStatusDto,
//     );
//   }
}
