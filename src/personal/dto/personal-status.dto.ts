import { IsEnum, IsOptional } from 'class-validator';
import { PersonalStatus } from '../enum/personal.enum';

export class PersonalStatusDto {
  @IsOptional()
  @IsEnum(PersonalStatus, {
    message: `Status must be one of the following values: ${Object.values(PersonalStatus).join(', ')}`,
  })
  status: PersonalStatus;
}
