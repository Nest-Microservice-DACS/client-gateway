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

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesOrchestrator: PacientesOrchestrator) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesOrchestrator.createPaciente(createPacienteDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

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

  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    return this.pacientesOrchestrator.getPacienteById(+id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':status')
  findByStatus(
    @Param() statusDto: PacienteStatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.pacientesOrchestrator
      .getPacientesByStatus(statusDto.status, paginationDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

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
