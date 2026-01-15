import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;

  @IsInt()
  duration: number; // duración en minutos

  @IsOptional()
  description: string;

  @IsInt()
  @IsPositive()
  price: number;
}
