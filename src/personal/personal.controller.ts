import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { PERSONAL_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('personal')
export class PersonalController {
  constructor(
    @Inject(PERSONAL_SERVICE) private readonly personalService: ClientProxy,
  ) {}

  @Post()
  create(@Body() createPersonalDto: CreatePersonalDto) {
    return this.personalService.send({ cmd: 'create' }, createPersonalDto);
  }

  @Get()
  findAll() {
    return this.personalService.send({ cmd: 'findAll' }, {});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.personalService.send({ cmd: 'findOne' }, id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonalDto: UpdatePersonalDto,
  ) {
    return this.personalService.send({ cmd: 'update' }, { id, updatePersonalDto });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.personalService.send({ cmd: 'remove' }, id);
  }
}
