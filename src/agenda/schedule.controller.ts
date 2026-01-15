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
import { ShiftOrchestrator } from './agenda.orchestrator';
import { CreateShiftDto, ShiftPaginationDto, UpdateShiftDto } from './dto';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

@Controller('schedule')
// Controlador para gestionar agenda de turnos
export class ScheduleController {
  // Inyectar orquestador para operaciones de agenda
  constructor(private readonly shiftOrchestrator: ShiftOrchestrator) {}

  // POST - Crear un nuevo turno
  @Post()
  create(@Body() createShiftDto: CreateShiftDto) {
    return this.shiftOrchestrator.createShift(createShiftDto).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  // GET - Obtener todos los turnos con paginación (Se puede filtrar por estado, quirófano y rango de fechas)
  @Get()
  findAll(@Query() shiftPaginationDto: ShiftPaginationDto) {
    return this.shiftOrchestrator.getAllShifts(shiftPaginationDto).pipe(catchError((err) => {
      throw new RpcException(err);
    }));  
  }

  // GET - Obtener un turno por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shiftOrchestrator.getShiftById(id).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  // PATCH - Actualizar turno 
  @UseGuards(AuthGuard('keycloak'))
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateShiftDto: UpdateShiftDto) {
    return this.shiftOrchestrator.updateShift(id, updateShiftDto).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  // DELETE - Eliminar un turno 
  @UseGuards(AuthGuard('keycloak'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.shiftOrchestrator.deleteShift(id).pipe(catchError((err) => {
      throw new RpcException(err);
    }));  
  }
}
