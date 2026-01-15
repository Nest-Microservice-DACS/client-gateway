import { IsNumber, IsPositive, IsEnum } from 'class-validator';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PersonalRole } from 'src/personal/enum/personal.enum';

export class MedicoCirugiaDto {
  @IsNumber()
  @IsPositive()
  medicoId: number;

  @IsEnum(PersonalRole)
  rol: PersonalRole;
}

export class AddMedicosCirugiaDto {
  @ValidateNested({ each: true })
  @Type(() => MedicoCirugiaDto)
  medicos: MedicoCirugiaDto[];
}

export class RemoveMedicosCirugiaDto {
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  medicoIds: number[];
}
