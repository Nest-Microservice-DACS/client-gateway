import { Injectable } from '@nestjs/common';
import { ScheduleClient } from './clients/shift.client';
import { CreateShiftDto, ShiftPaginationDto, UpdateShiftDto } from './dto';

@Injectable()
export class ShiftOrchestrator {

  constructor(private readonly scheduleClient: ScheduleClient) {}

  createShift(dto: CreateShiftDto) {
    return this.scheduleClient.createShift(dto);
  }

  getAllShifts(paginationDto: ShiftPaginationDto) {
    return this.scheduleClient.getAllShifts(paginationDto);
  }

  getShiftById(id: number) {
    return this.scheduleClient.getShiftById(id);
  }

  updateShift(id: number, updateShiftDto: UpdateShiftDto) {
    return this.scheduleClient.updateShift(id, updateShiftDto);
  }

//   changeTurnoStatus(id: number, dto: ChangeTurnoStatusDto) {
//     return this.agendaClient.changeTurnoStatus(id, dto);
//   }

  deleteShift(id: number) {
    return this.scheduleClient.deleteShift(id);
  }
}
