import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CIRUGIAS_SERVICE, PACIENTES_SERVICE } from 'src/config';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreatePacienteDto, PacienteStatusDto, UpdatePacienteDto } from './dto';

@Injectable()
export class PacientesClient {
  constructor(
    @Inject(PACIENTES_SERVICE)
    private readonly pacientesClient: ClientProxy,
  ) {}

  createPaciente(dto: CreatePacienteDto) {
    return this.pacientesClient.send({ cmd: 'create_paciente' }, dto);
  }

  getAllPacientes(paginationDto: PaginationDto) {
    return this.pacientesClient.send({ cmd: 'get_pacientes' }, paginationDto);
  }

  getPacientesByStatus(
    status: PacienteStatusDto,
    paginationDto: PaginationDto,
  ) {
    return this.pacientesClient.send(
      { cmd: 'get_pacientes_by_status' },
      { status, ...paginationDto },
    );
  }

  getPacienteById(id: number) {
    return this.pacientesClient.send({ cmd: 'get_paciente_by_id' }, id );
  }

  updatePaciente(id: number, dto: UpdatePacienteDto) {
    return this.pacientesClient.send({ cmd: 'update_paciente' }, dto);
  }

  deletePaciente(id: number) {
    return this.pacientesClient.send({ cmd: 'delete_paciente' },  id );
  }

  changeStatus(id: number, statusDto: PacienteStatusDto) {
    return this.pacientesClient.send(
      { cmd: 'change_status_paciente' },
      { id, ...statusDto },
    );
  }
}
