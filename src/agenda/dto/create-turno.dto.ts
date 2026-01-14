import {
  IsDateString,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AgendaStatus, AgendaStatusList } from '../enum/agenda.enum';

export class CreateTurnoDto {
  @IsNumber()
  @IsPositive()
  quirofanoId: number;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  // @IsOptional()
  // @IsEnum(AgendaStatusList, {
  //   message: `Possible status values are ${Object.values(AgendaStatusList).join(', ')}`,
  // })
  // status?: AgendaStatus = AgendaStatus.AVAILABLE;

  @IsNumber()
  @IsPositive()
  cirugiaId: number;

  @IsNumber()
  @IsPositive()
  version?: number;
}
