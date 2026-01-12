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
  Query,
} from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { SERVICIOS_SERVICE } from 'src/config';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';

@Controller('servicios')
export class ServiciosController {
  constructor(
    @Inject(SERVICIOS_SERVICE) private readonly serviciosService: ClientProxy,
  ) {}
  @Post()
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosService.send(
      { cmd: 'create_servicio' },
      createServicioDto,
    ).pipe(
      catchError((error) => {
        throw new RpcException(error.message);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.serviciosService.send({ cmd: 'get_servicios' }, paginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error.message);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serviciosService.send({ cmd: 'get_servicio_by_id' }, id).pipe(
      catchError((error) => {
        throw new RpcException(error.message);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServicioDto: UpdateServicioDto,
  ) {
    return this.serviciosService.send(
      { cmd: 'update_servicio' },
      { id, ...updateServicioDto },
    ).pipe(
      catchError((error) => {
        throw new RpcException(error.message);
      }),
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.serviciosService.send({ cmd: 'remove_servicio' }, id).pipe(
      catchError((error) => {
        throw new RpcException(error.message);
      }),
    );
  }
}
