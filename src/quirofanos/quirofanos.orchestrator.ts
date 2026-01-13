import { Injectable } from '@nestjs/common';
import { ChangeQuirofanoStatusDto, CreateQuirofanoDto, UpdateQuirofanoDto } from './dto';
import { QuirofanosClient } from './clients/quirofanos.client';
import { PaginationDto } from 'src/common';

@Injectable()
export class QuirofanosOrchestrator {
  constructor(private readonly quirofanosClient: QuirofanosClient) {}

  createQuirofano(createQuirofanoDto: CreateQuirofanoDto) {
    return this.quirofanosClient.createQuirofano(createQuirofanoDto);
  }

  getAllQuirofanos(paginationDto: PaginationDto) {
    return this.quirofanosClient.getAllQuirofanos(paginationDto);
  }

  getQuirofanoById(id: number) {
    return this.quirofanosClient.getQuirofanoById(id);
  }

  updateQuirofano(id: number, updateQuirofanoDto: UpdateQuirofanoDto) {
    return this.quirofanosClient.updateQuirofano(id, updateQuirofanoDto);
  }

  changeStatusQuirofano(id: number, changeQuirofanoStatusDto: ChangeQuirofanoStatusDto) {
    return this.quirofanosClient.changeStatusQuirofano(id, changeQuirofanoStatusDto);
  }
}
