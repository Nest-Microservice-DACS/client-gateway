import {
  IsDateString,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateShiftDto {
  @IsNumber()
  @IsPositive()
  operatingRoomId: number;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  // @IsOptional()
  // @IsEnum(ShiftStatusList, {
  //   message: `Possible status values are ${Object.values(ShiftStatusList).join(', ')}`,
  // })
  // status?: ShiftStatus = ShiftStatus.AVAILABLE;

  @IsNumber()
  @IsPositive()
  surgeryId: number;

  @IsNumber()
  @IsPositive()
  version?: number;
}
