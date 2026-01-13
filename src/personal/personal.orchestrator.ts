import { Injectable } from '@nestjs/common';
import { PersonalClient } from './clients/personal.client';
import { CreatePersonalDto, PersonalPaginationDto, UpdatePersonalDto } from './dto';

@Injectable()
export class PersonalOrchestrator {
  constructor(private readonly personalClient: PersonalClient) {}

  createPersonal(createPersonalDto: CreatePersonalDto) {
    return this.personalClient.createPersonal(createPersonalDto);
  }

  getAllPersonal(PersonalPaginationDto: PersonalPaginationDto) {
    return this.personalClient.getAllPersonal(PersonalPaginationDto);
  }

  getPersonalById(id: number) {
    return this.personalClient.getPersonalById(id);
  }

  updatePersonal(id: number, updatePersonalDto: UpdatePersonalDto) {
    return this.personalClient.updatePersonal(id, updatePersonalDto);
  }

  changeStatusPersonal(id: number, dto: any) {
    return this.personalClient.changeStatusPersonal(id, dto);
  }
}
