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
import { PacientePaginationDto, StatusDto } from './dto';
import { PaginationDto } from 'src/common';
import { PacienteStatus } from './enum/pacientes.enum';

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
    return this.pacientesService.send(
      {cmd: 'find_all_pacientes'},
      pacientePaginationDto,
    );
  }

  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    return this.pacientesService.send('findOnePaciente', +id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':status')
  findByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.pacientesService
      .send('findAllPacientes', { ...paginationDto, status: statusDto.status })
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
    return this.pacientesService.send('updatePaciente', {
      ...updatePacienteDto,
      id: id,
    });
  }

  
  @Patch('status/:id')
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: StatusDto,
  ) {
    return this.pacientesService
      .send('changePacienteStatus', {
        id: id,
        status: statusDto.status,
      })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
