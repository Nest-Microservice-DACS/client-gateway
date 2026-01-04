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
} from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { PACIENTES_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PacientePaginationDto } from './dto';

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
  findAll(@Query() pacientePaginationDto: PacientePaginationDto) {
     return this.pacientesService.send('findAllPacientes', pacientePaginationDto);
  }
 
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pacientesService.send('findOnePaciente', +id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePacienteDto: UpdatePacienteDto,
  ) {
    return this.pacientesService.send('updatePaciente', {
      ...updatePacienteDto,
      id: +id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacientesService.send('removePaciente', +id);
  }
}
