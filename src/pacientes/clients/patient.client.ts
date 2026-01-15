import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SURGERY_SERVICE, PATIENT_SERVICE } from 'src/config';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreatePatientDto, PatientPaginationDto, PatientStatusDto, UpdatePatientDto } from '../dto';

@Injectable()
export class PatientClient {
  constructor(
    @Inject(PATIENT_SERVICE)
    private readonly patientClient: ClientProxy,
  ) {}

  createPatient(createPatientDto: CreatePatientDto) {
    return this.patientClient.send({ cmd: 'create_patient' }, createPatientDto);
  }

  getAllPatients(paginationDto: PatientPaginationDto) {
    return this.patientClient.send({ cmd: 'get_all_patients' }, paginationDto);
  }

  getPatientById(id: number) {
    return this.patientClient.send({ cmd: 'get_patient_by_id' }, id );
  }

  updatePatient(id: number, dto: UpdatePatientDto) {
    return this.patientClient.send({ cmd: 'update_patient' }, {dto, id} );
  }

  deletePatient(id: number) {
    return this.patientClient.send({ cmd: 'delete_paciente' },  id );
  }

  changeStatus(id: number, statusDto: PatientStatusDto) {
    return this.patientClient.send(
      { cmd: 'change_status_paciente' },
      { id, ...statusDto },
    );
  }
}
