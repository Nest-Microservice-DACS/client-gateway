import { IsEnum, IsOptional } from 'class-validator';
import { AgendaStatus, AgendaStatusList } from '../enum/agenda.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Type } from 'class-transformer';

export class TurnoPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(AgendaStatusList, {
    message: `Possible status values are ${AgendaStatusList.join(', ')}`,
  })
  status: AgendaStatus;

  @IsOptional()
  @Type(() => Number)
  quirofanoId: number;
}
