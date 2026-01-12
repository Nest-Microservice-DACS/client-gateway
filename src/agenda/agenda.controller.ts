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
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AGENDA_SERVICE } from 'src/config/services';
import { CreateTurnoDto, TurnoPaginationDto, UpdateTurnoDto } from './dto';
import { catchError } from 'rxjs';

@Controller('agenda')
export class AgendaController {
  constructor(
    @Inject(AGENDA_SERVICE) private readonly agendaService: ClientProxy,
  ) {}

  @Post()
  create(@Body() createTurnoDto: CreateTurnoDto) {
    return this.agendaService.send({ cmd: 'create_turno' }, createTurnoDto).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  @Get()
  findAll(@Body() turnoPaginationDto: TurnoPaginationDto) {
    return this.agendaService.send({ cmd: 'find_all_turnos' }, turnoPaginationDto).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.agendaService.send({ cmd: 'find_one_turno' }, id).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTurnoDto: UpdateTurnoDto) {
    return this.agendaService.send({ cmd: 'update_turno' }, updateTurnoDto).pipe(catchError((err) => {
      throw new RpcException(err);
    }));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) cirugiaId: number) {
    return this.agendaService.send({ cmd: 'remove_turno' }, cirugiaId).pipe(catchError((err) => {
      throw new RpcException(err);
    }));  
  }
}
