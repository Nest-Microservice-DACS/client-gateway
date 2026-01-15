import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PERSONAL_SERVICE } from 'src/config';
import { CreatePersonalDto } from '../dto/create-personal.dto';
import { UpdatePersonalDto } from '../dto/update-personal.dto';
import { ChangeStatusPersonalDto } from '../dto/change-status-personal.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class PersonalClient {
  constructor(
    @Inject(PERSONAL_SERVICE)
    private readonly personalClient: ClientProxy,
  ) {}

  createPersonal(createPersonalDto: CreatePersonalDto) {
    return this.personalClient.send({ cmd: 'create_personal' }, createPersonalDto);
  }

  getAllPersonal(paginationDto: PaginationDto) {
    return this.personalClient.send({ cmd: 'get_personal' }, paginationDto);
  }

  getPersonalById(id: number) {
    return this.personalClient.send({ cmd: 'get_personal_by_id' }, id );
  }

  getPersonalByIds(ids: number[]) {
    console.log('PersonalClient - getPersonalByIds called with ids:', ids);
    return this.personalClient.send({ cmd: 'get_personal_by_ids' }, ids );
  }

  updatePersonal(id: number, updatePersonalDto: UpdatePersonalDto) {
    return this.personalClient.send({ cmd: 'update_personal' }, { id, ...updatePersonalDto });
  }

  changeStatusPersonal(id: number, changeStatusPersonalDto: ChangeStatusPersonalDto) {
    return this.personalClient.send({ cmd: 'change_status_personal' }, { id, ...changeStatusPersonalDto });
  }


  
}
