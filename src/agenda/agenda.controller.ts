import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AgendaOrchestrator } from './agenda.orchestrator';
import { CreateTurnoDto, TurnoPaginationDto, UpdateTurnoDto } from './dto';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Controller('agenda')
// Controlador para gestionar agenda de turnos
export class AgendaController {
  // Inyectar orquestador para operaciones de agenda
  constructor(private readonly agendaOrchestrator: AgendaOrchestrator) {}

  // POST - Crear un nuevo turno
  @Post()
  create(@Body() createTurnoDto: CreateTurnoDto) {
    return this.agendaOrchestrator.createTurno(createTurnoDto).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  // GET - Obtener todos los turnos con paginación (Se puede filtrar por estado, quirófano y rango de fechas)
  @Get()
  findAll(@Query() turnoPaginationDto: TurnoPaginationDto) {
    return this.agendaOrchestrator.getAllTurnos(turnoPaginationDto).pipe(catchError((err) => {
      throw new RpcException(err);
    }));  
  }

  // GET - Obtener un turno por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.agendaOrchestrator.getTurnoById(id).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  // PATCH - Actualizar turno 
  @UseGuards(AuthGuard('keycloak'))
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTurnoDto: UpdateTurnoDto) {
    return this.agendaOrchestrator.updateTurno(id, updateTurnoDto).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  // DELETE - Eliminar un turno 
  @UseGuards(AuthGuard('keycloak'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.agendaOrchestrator.deleteTurno(id).pipe(catchError((err) => {
      throw new RpcException(err);
    }));  
  }
}
