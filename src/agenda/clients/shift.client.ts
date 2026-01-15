import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SCHEDULE_SERVICE } from 'src/config';
import { UpdateShiftDto } from '../dto/update-shift.dto';
import { CreateShiftDto, ShiftPaginationDto } from '../dto';


@Injectable()
export class ScheduleClient {
  
  constructor(
    @Inject(SCHEDULE_SERVICE)
    private readonly scheduleClient: ClientProxy,
  ) {}

  createShift(createShiftDto: CreateShiftDto) {
    return this.scheduleClient.send({ cmd: 'create_shift' }, createShiftDto);
  }

  getAllShifts(shiftPaginationDto: ShiftPaginationDto) {
    return this.scheduleClient.send({ cmd: 'get_shifts' }, shiftPaginationDto);
  }

  getShiftById(surgeryId: number) {
    return this.scheduleClient.send({ cmd: 'get_shift_by_surgery_id' }, surgeryId);
  }

  updateShift(id: number, updateShiftDto: UpdateShiftDto) {
    return this.scheduleClient.send({ cmd: 'update_shift' }, updateShiftDto);
  }

  deleteShift(surgeryId: number) {
    return this.scheduleClient.send({ cmd: 'remove_shift' }, surgeryId);
  }

//     changeTurnoStatus(id: number, changeTurnoStatusDto: ChangeTurnoStatusDto) {
//     return this.agendaClient.send(
//       { cmd: 'change_turno_status' },
//       changeTurnoStatusDto,
//     );
//   }
}
