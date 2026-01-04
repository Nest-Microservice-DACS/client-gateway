import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsDateString()
  fechaNac: string;

  @IsString()
  direccion: string;

  @IsString()
  telefono: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsEnum(['ACTIVE', 'INACTIVE', 'SUSPENDED'], {
    message: 'Possible status values are ACTIVE, INACTIVE, SUSPENDED',
  })
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}
