import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { ClientProxy } from '@nestjs/microservices';
import { AGENDA_SERVICE } from 'src/config/services';

@Controller('agenda')
export class AgendaController {
  constructor(
    @Inject(AGENDA_SERVICE) private readonly agendaService: ClientProxy,
  ) {}

  @Post()
  create(@Body() createAgendaDto: CreateAgendaDto) {
    return this.agendaService.send({ cmd: 'create_turno' }, createAgendaDto);
  }

  @Get()
  findAll() {
    return this.agendaService.send({ cmd: 'find_all_turnos' }, {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agendaService.send({ cmd: 'find_one_turno' }, +id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgendaDto: UpdateAgendaDto) {
    return this.agendaService.send({ cmd: 'update_turno' }, { id: +id, ...updateAgendaDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agendaService.send({ cmd: 'remove_turno' }, +id);
  }
}
