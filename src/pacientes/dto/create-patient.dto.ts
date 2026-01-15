import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsDateString()
  birthDate: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsEnum(['ACTIVE', 'INACTIVE', 'SUSPENDED'], {
    message: 'Possible status values are ACTIVE, INACTIVE, SUSPENDED',
  })
  status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}
