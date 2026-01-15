import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PatientPaginationDto, PatientStatusDto } from './dto';
import { PatientOrchestrator } from './patient.orchestrator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('keycloak'))
@Controller('patients')
// Controlador para gestionar pacientes
export class PatientController {
  // Inyectar orquestador de pacientes
  constructor(private readonly patientOrchestrator: PatientOrchestrator) {}

  // POST - Crear nuevo paciente
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientOrchestrator.createPatient(createPatientDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // GET - Obtener todos los pacientes con paginación
  @Get()
  findAll(@Query() pacientePaginationDto: PatientPaginationDto) {
    return this.patientOrchestrator
      .getAllPatients(pacientePaginationDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  // GET - Obtener paciente por ID
  @Get('id/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.patientOrchestrator.getPatientById(id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // PATCH - Actualizar paciente
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientOrchestrator
      .updatePatient(id, updatePatientDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  // PATCH - Cambiar estado del paciente
  @Patch('status/:id')
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: PatientStatusDto,
  ) {
    return this.patientOrchestrator.changeStatus(id, statusDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
