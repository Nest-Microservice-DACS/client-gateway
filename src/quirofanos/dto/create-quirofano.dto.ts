import { IsEnum, IsOptional, IsString } from 'class-validator';
import { QuirofanoEstado, QuirofanoEstadoList } from '../enum/quirofano.enum';

export class CreateQuirofanoDto {
  @IsString()
  nombre: string;

  @IsEnum(QuirofanoEstadoList, {
    message: 'Estados permitidos: ' + QuirofanoEstadoList.join(', '),
  })
  @IsOptional()
  estado: QuirofanoEstado = QuirofanoEstado.DISPONIBLE;

  @IsOptional()
  ubicacion: string;
}
