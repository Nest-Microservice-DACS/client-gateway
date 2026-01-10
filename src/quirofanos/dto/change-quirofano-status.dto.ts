import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { QuirofanoEstado, QuirofanoEstadoList } from '../enum/quirofano.enum';

export class ChangeQuirofanoStatusDto {
  @IsEnum(QuirofanoEstado, {
    message: 'Estados permitidos: ' + QuirofanoEstadoList.join(', '),
  })
  estado: QuirofanoEstado;
}
