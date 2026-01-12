import { Injectable } from '@nestjs/common';
import { PacientesClient } from './pacientes.client';
import { PacienteStatusDto } from './dto';

@Injectable()
export class PacientesOrchestrator {
  constructor(private readonly pacientesClient: PacientesClient) {}

  createPaciente(dto: any) {
    return this.pacientesClient.createPaciente(dto);
  }

  getAllPacientes(paginationDto: any) {
    return this.pacientesClient.getAllPacientes(paginationDto);
  }

  getPacienteById(id: number) {
    const paciente = this.pacientesClient.getPacienteById(id);
    return paciente; 
  }

  getPacientesByStatus(status: any, paginationDto: any) {
    return this.pacientesClient.getPacientesByStatus(status, paginationDto);
  }

  updatePaciente(id: number, dto: any) {
    return this.pacientesClient.updatePaciente(id, dto);
  }

  deletePaciente(id: number) {
    return this.pacientesClient.deletePaciente(id);
  }

  changeStatus(id: number, statusDto: PacienteStatusDto) {
    return this.pacientesClient.changeStatus(id, statusDto);
  }
}
