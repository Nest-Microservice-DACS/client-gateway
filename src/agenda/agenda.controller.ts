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
export class AgendaController {
  constructor(private readonly agendaOrchestrator: AgendaOrchestrator) {}

  @Post()
  create(@Body() createTurnoDto: CreateTurnoDto) {
    return this.agendaOrchestrator.createTurno(createTurnoDto).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  @Get()
  findAll(@Query() turnoPaginationDto: TurnoPaginationDto) {
    return this.agendaOrchestrator.getAllTurnos(turnoPaginationDto).pipe(catchError((err) => {
      throw new RpcException(err);
    }));  
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.agendaOrchestrator.getTurnoById(id).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  @UseGuards(AuthGuard('keycloak'))
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTurnoDto: UpdateTurnoDto) {
    return this.agendaOrchestrator.updateTurno(id, updateTurnoDto).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  @UseGuards(AuthGuard('keycloak'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.agendaOrchestrator.deleteTurno(id).pipe(catchError((err) => {
      throw new RpcException(err);
    }));  
  }
}
