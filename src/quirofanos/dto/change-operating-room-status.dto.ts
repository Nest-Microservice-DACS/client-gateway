import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { OperatingRoomEstado, OperatingRoomEstadoList } from '../enum/operating-room.enum';

export class ChangeOperatingRoomStatusDto {
  @IsEnum(OperatingRoomEstado, {
    message: `Possible status values are ${OperatingRoomEstadoList.join(', ')}`,
  })
  status: OperatingRoomEstado;
}
