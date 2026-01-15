import { IsEnum, IsOptional, IsString } from 'class-validator';
import { OperatingRoomEstado, OperatingRoomEstadoList } from '../enum/operating-room.enum';

export class CreateOperatingRoomDto {
  @IsString()
  name: string;

  @IsEnum(OperatingRoomEstadoList, {
    message: 'Available statuses: ' + OperatingRoomEstadoList.join(', '),
  })
  @IsOptional()
  status: OperatingRoomEstado = OperatingRoomEstado.AVAILABLE;

  @IsOptional()
  location: string;
}
