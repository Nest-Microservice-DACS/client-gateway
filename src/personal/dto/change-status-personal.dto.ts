import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { PersonalStatus, PersonalStatusList } from '../enum/personal.enum';

export class ChangeStatusPersonalDto {
  @IsEnum(PersonalStatusList, {
    message: 'Estados permitidos: ' + PersonalStatusList.join(', '),
  })
  status: PersonalStatus;
}
