import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class ServicioResponseDto {
  @IsInt()
  id: number;

  @IsString()
  nombre: string;

  @IsInt()
  duracion: number; // duración en minutos

  @IsOptional()
  descripcion: string;

  @IsInt()
  @IsPositive()
  precio: number;
}
