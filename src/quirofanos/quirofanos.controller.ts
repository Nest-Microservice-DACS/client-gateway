import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';

import { ClientProxy } from '@nestjs/microservices';
import { QUIROFANOS_SERVICE } from 'src/config';
import { ChangeQuirofanoStatusDto, CreateQuirofanoDto, UpdateQuirofanoDto } from './dto';


@Controller('quirofanos')
export class QuirofanosController {
  @Inject(QUIROFANOS_SERVICE) private readonly quirofanosService: ClientProxy;

  @Post()
  create(@Body() createQuirofanoDto: CreateQuirofanoDto) {
    return this.quirofanosService.send({ cmd: 'create_quirofano' }, createQuirofanoDto);
  }

  @Get()
  findAll() {
    return this.quirofanosService.send({ cmd: 'find_all_quirofanos' }, {});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quirofanosService.send({ cmd: 'find_one_quirofano' }, id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuirofanoDto: UpdateQuirofanoDto,
  ) {
    return this.quirofanosService.send({ cmd: 'update_quirofano' }, {
      id,
      ...updateQuirofanoDto,
    });
  }

  @Patch('status/:id')
  changeStatus(@Param('id', ParseIntPipe) id: number, @Body() changeQuirofanoStatusDto: ChangeQuirofanoStatusDto) {
    return this.quirofanosService.send({ cmd: 'change_quirofano_status' }, { id, ...changeQuirofanoStatusDto });
  }
}
