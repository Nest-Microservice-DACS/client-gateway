import { Injectable } from '@nestjs/common';
import { AgendaClient } from './clients/agenda.client';
import { ChangeTurnoStatusDto, CreateTurnoDto, TurnoPaginationDto, UpdateTurnoDto } from './dto';

@Injectable()
export class AgendaOrchestrator {
  constructor(private readonly agendaClient: AgendaClient) {}

  createTurno(dto: CreateTurnoDto) {
    return this.agendaClient.createTurno(dto);
  }

  getAllTurnos(paginationDto: TurnoPaginationDto) {
    return this.agendaClient.getAllTurnos(paginationDto);
  }

  getTurnoById(id: number) {
    return this.agendaClient.getTurnoById(id);
  }

  updateTurno(id: number, updateTurnoDto: UpdateTurnoDto) {
    return this.agendaClient.updateTurno(id, updateTurnoDto);
  }

//   changeTurnoStatus(id: number, dto: ChangeTurnoStatusDto) {
//     return this.agendaClient.changeTurnoStatus(id, dto);
//   }

  deleteTurno(id: number) {
    return this.agendaClient.deleteTurno(id);
  }
}
