import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SURGERY_SERVICE } from 'src/config';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AddDoctorsSurgeryDto, CreateSurgeryDto, RemoveDoctorsSurgeryDto, UpdateSurgeryDto } from '../dto';

@Injectable()
export class SurgeryClient {
  constructor(
    @Inject(SURGERY_SERVICE)
    private readonly surgeryClient: ClientProxy,
  ) {}

  createSurgery(dto: CreateSurgeryDto) {
    return this.surgeryClient.send({ cmd: 'create_surgery' }, dto);
  }

  getAllSurgeries(paginationDto: PaginationDto) {
    return this.surgeryClient.send({ cmd: 'get_surgeries' }, paginationDto);
  }

  getSurgeryById(id: number) {
    return this.surgeryClient.send({ cmd: 'get_surgery_by_id' }, { id });
  }

  updateSurgery(id: number, dto: UpdateSurgeryDto) {
    return this.surgeryClient.send({ cmd: 'update_surgery' }, { id, ...dto });
  }

  deleteSurgery(id: number) {
    return this.surgeryClient.send({ cmd: 'delete_surgery' }, id);
  }

  addDoctorsToSurgery(surgeryId: number, addDoctorsDto: AddDoctorsSurgeryDto) {
    console.log('CirugiasClient - addDoctorsToSurgery called:' + JSON.stringify({ surgeryId, ...addDoctorsDto }));
    return this.surgeryClient.send(
      { cmd: 'add_doctors_to_surgery' },
      { surgeryId, ...addDoctorsDto },
    );
  }

  removeDoctorsFromSurgery(
    surgeryId: number,
    removeDoctorsDto: RemoveDoctorsSurgeryDto,
  ) {
    return this.surgeryClient.send(
      { cmd: 'remove_doctors_from_surgery' },
      { surgeryId, ...removeDoctorsDto },
    );
  }
}
