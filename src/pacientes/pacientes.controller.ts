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
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { PACIENTES_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PacientePaginationDto, PacienteStatusDto } from './dto';
import { PaginationDto } from 'src/common';
import { PacienteStatus } from './enum/pacientes.enum';
import { PacientesOrchestrator } from './pacientes.orchestrator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('keycloak'))
@Controller('pacientes')
// Controlador para gestionar pacientes
export class PacientesController {
  // Inyectar orquestador de pacientes
  constructor(private readonly pacientesOrchestrator: PacientesOrchestrator) {}

  // POST - Crear nuevo paciente
  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesOrchestrator.createPaciente(createPacienteDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // GET - Obtener todos los pacientes con paginación
  @Get()
  findAll(@Query() pacientePaginationDto: PacientePaginationDto) {
    return this.pacientesOrchestrator
      .getAllPacientes(pacientePaginationDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  // GET - Obtener paciente por ID
  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    return this.pacientesOrchestrator.getPacienteById(+id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // PATCH - Actualizar paciente
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacientesOrchestrator
      .updatePaciente(id, updatePacienteDto)
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
    @Body() statusDto: PacienteStatusDto,
  ) {
    return this.pacientesOrchestrator.changeStatus(id, statusDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
