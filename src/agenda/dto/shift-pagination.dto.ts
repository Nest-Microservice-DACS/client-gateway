import { IsDate, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { ShiftStatus, ShiftStatusList } from '../enum/shift.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Type } from 'class-transformer';

export class ShiftPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(ShiftStatusList, {
    message: `Possible status values are ${Object.values(ShiftStatusList).join(', ')}`,
  })
  status?: ShiftStatus;

  @IsOptional()
  @Type(() => Number)
  operatingRoomId: number;

  @IsOptional()
  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate: string;
}
