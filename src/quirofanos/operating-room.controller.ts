import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';

import { OperatingRoomOrchestrator } from './operating-room.orchestrator';
import {
  ChangeOperatingRoomStatusDto,
  CreateOperatingRoomDto,
  UpdateOperatingRoomDto,
} from './dto';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('keycloak'))
@Controller('operating-rooms')
// Controlador para gestionar quirófanos
export class OperatingRoomController {
  // Inyectar orquestador de quirófanos
  constructor(
    private readonly operatingRoomOrchestrator: OperatingRoomOrchestrator,
  ) {}

  // POST - Crear nuevo quirófano
  @Post()
  create(@Body() createOperatingRoomDto: CreateOperatingRoomDto) {
    return this.operatingRoomOrchestrator.createOperatingRoom(createOperatingRoomDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // GET - Obtener todos los quirófanos con paginación
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.operatingRoomOrchestrator.getAllOperatingRooms(paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // GET - Obtener quirófano por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.operatingRoomOrchestrator.getOperatingRoomById(id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // PATCH - Actualizar quirófano
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOperatingRoomDto: UpdateOperatingRoomDto,
  ) {
    return this.operatingRoomOrchestrator
      .updateOperatingRoom(id, updateOperatingRoomDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  // PATCH - Cambiar estado del quirófano
  @Patch('status/:id')
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeOperatingRoomStatusDto: ChangeOperatingRoomStatusDto,
  ) {
    return this.operatingRoomOrchestrator
      .changeStatusOperatingRoom(id, changeOperatingRoomStatusDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
