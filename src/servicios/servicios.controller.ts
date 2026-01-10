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
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICIOS_SERVICE } from 'src/config';

@Controller('servicios')
export class ServiciosController {
  constructor(
    @Inject(SERVICIOS_SERVICE) private readonly serviciosService: ClientProxy,
  ) {}
  @Post()
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.send({ cmd: 'create_servicio' }, createServicioDto);
  }

  @Get()
  findAll() {
    return this.serviciosService.send({ cmd: 'get_servicios' }, {});
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serviciosService.send({ cmd: 'get_servicio_by_id' }, id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServicioDto: UpdateServicioDto,
  ) {
    return this.serviciosService.send({ cmd: 'update_servicio' }, { id, ...updateServicioDto });
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.serviciosService.send({ cmd: 'remove_servicio' },  id );
  }
}
