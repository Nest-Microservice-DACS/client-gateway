import { Injectable } from '@nestjs/common';
import { PatientClient } from './clients/patient.client';
import { CreatePatientDto, PatientPaginationDto, PatientStatusDto, UpdatePatientDto } from './dto';
import { PaginationDto } from 'src/common';

@Injectable()
export class PatientOrchestrator {
  constructor(private readonly patientClient: PatientClient) {}

  createPatient(createPatientDto: CreatePatientDto) {
    return this.patientClient.createPatient(createPatientDto);
  }

  getAllPatients(paginationDto: PatientPaginationDto) {
    return this.patientClient.getAllPatients(paginationDto);
  }

  getPatientById(id: number) {
    const patient = this.patientClient.getPatientById(id);
    return patient; 
  }

  updatePatient(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientClient.updatePatient(id, updatePatientDto);
  }

  deletePatient(id: number) {
    return this.patientClient.deletePatient(id);
  }

  changeStatus(id: number, statusDto: PatientStatusDto) {
    return this.patientClient.changeStatus(id, statusDto);
  }
}
