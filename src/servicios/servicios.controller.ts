import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { ServiciosOrchestrator } from './servicios.orchestrator';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosOrchestrator: ServiciosOrchestrator) {}

  @Post()
  create(@Body() createServicioDto: CreateServicioDto) {
    return this.serviciosOrchestrator.createServicio(createServicioDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.serviciosOrchestrator.getAllServicios(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serviciosOrchestrator.getServicioById(id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServicioDto: UpdateServicioDto,
  ) {
    return this.serviciosOrchestrator
      .updateServicio(id, updateServicioDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.serviciosOrchestrator.deleteServicio(id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
