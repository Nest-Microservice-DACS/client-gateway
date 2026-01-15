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
  UseGuards,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesOrchestrator } from './service.orchestrator';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('keycloak'))
@Controller('services')
export class ServiciosController {
  constructor(private readonly servicesOrchestrator: ServicesOrchestrator) {}

  @Post()
  create(@Body() createServicioDto: CreateServiceDto) {
    return this.servicesOrchestrator.createService(createServicioDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.servicesOrchestrator.getAllServices(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.servicesOrchestrator.getServiceById(id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServicioDto: UpdateServiceDto,
  ) {
    return this.servicesOrchestrator
      .updateServices(id, updateServicioDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.servicesOrchestrator.deleteService(id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
