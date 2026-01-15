import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class ServiceResponseDto {
  @IsInt()
  id: number;

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
