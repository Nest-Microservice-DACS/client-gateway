import { IsEnum, IsOptional } from 'class-validator';
import { PacienteStatus } from '../enum/pacientes.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(PacienteStatus, {
    message: `Status must be one of the following values: ${Object.values(PacienteStatus).join(', ')}`,
  })
  status: PacienteStatus;
}
