import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { QUIROFANOS_SERVICE } from 'src/config';
import { ChangeQuirofanoStatusDto, UpdateQuirofanoDto } from '../dto';


@Injectable()
export class QuirofanosClient {
  constructor(
    @Inject(QUIROFANOS_SERVICE)
    private readonly quirofanosClient: ClientProxy,
  ) {}

  createQuirofano(dto: any) {
    return this.quirofanosClient.send({ cmd: 'create_quirofano' }, dto);
  }

  getAllQuirofanos(paginationDto: any) {
    return this.quirofanosClient.send({ cmd: 'get_quirofanos' }, paginationDto);
  }

  getQuirofanoById(id: number) {
    return this.quirofanosClient.send({ cmd: 'get_quirofano_by_id' },  id );
  }

  updateQuirofano(id: number, updateQuirofanoDto: UpdateQuirofanoDto) {
    return this.quirofanosClient.send({ cmd: 'update_quirofano' }, { id, ...updateQuirofanoDto });
  }

  changeStatusQuirofano(id: number, changeQuirofanoStatusDto: ChangeQuirofanoStatusDto) {
    return this.quirofanosClient.send({ cmd: 'change_quirofano_status' },  changeQuirofanoStatusDto );
  }
}
