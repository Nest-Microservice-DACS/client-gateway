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
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { PACIENTES_SERVICE } from 'src/config/services';
import { ClientProxy } from '@nestjs/microservices';

@Controller('pacientes')
export class PacientesController {
  constructor(
    @Inject(PACIENTES_SERVICE) private readonly pacientesService: ClientProxy,
  ) {}

  @Post()
  create(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.send('createPaciente', createPacienteDto);
  }

  @Get()
  findAll() {
    return this.pacientesService.send('findAllPacientes', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacientesService.send('findOnePaciente', +id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) { 
    return this.pacientesService.send('updatePaciente', { id: +id, ...updatePacienteDto });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientesService.send('removePaciente', +id);
  }
}
