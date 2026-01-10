import { PartialType } from '@nestjs/mapped-types';
import { CreateServicioDto } from './create-servicio.dto';
import { IsOptional } from 'class-validator';

export class UpdateServicioDto extends PartialType(CreateServicioDto) {
  @IsOptional()
  estado: boolean;
}
