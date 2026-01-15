import { IsEnum, IsOptional } from 'class-validator';
import { PatientStatus } from '../enum/patient.enum';

export class PatientStatusDto {
  @IsOptional()
  @IsEnum(PatientStatus, {
    message: `Status must be one of the following values: ${Object.values(PatientStatus).join(', ')}`,
  })
  status: PatientStatus;
}
