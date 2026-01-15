import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { ShiftStatus, ShiftStatusList } from '../enum/shift.enum';

export class ChangeTurnoStatusDto {
  @IsNumber()
  @IsPositive()
  cirugiaId: number;

  @IsEnum(ShiftStatusList, {
    message: `Possible status values are ${Object.values(ShiftStatusList).join(', ')}`,
  })
  status: ShiftStatus;
}
