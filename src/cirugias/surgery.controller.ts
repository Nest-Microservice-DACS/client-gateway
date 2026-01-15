import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { SurgeryOrchestrator } from './surgery.orchestrator';
import { AuthGuard } from '@nestjs/passport';
import { AddDoctorsSurgeryDto, CreateSurgeryDto, RemoveDoctorsSurgeryDto, UpdateSurgeryDto } from './dto';

/**
 * Controlador para gestionar cirugías
 * @UseGuards(AuthGuard('keycloak')) - Protege todas las rutas con autenticación JWT
 */
@UseGuards(AuthGuard('keycloak'))
@Controller('surgeries')
export class SurgeryController {
  // Inyección del servicio orquestador que maneja la lógica de cirugías
  constructor(private readonly surgeryOrchestrator: SurgeryOrchestrator) {}

  // POST - Crea una nueva cirugía
  @Post()
  createSurgery(@Body() createSurgeryDto: CreateSurgeryDto) {
    return this.surgeryOrchestrator.createSurgery(createSurgeryDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // GET - Obtiene todas las cirugías con paginación
  @Get()
  getAllSurgeries(@Query() paginationDto: PaginationDto) {
    return this.surgeryOrchestrator.getAllSurgeries(paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // GET - Obtiene una cirugía por su ID
  @Get(':id')
  getSurgeryById(@Param('id', ParseIntPipe) id: number) {
    return this.surgeryOrchestrator.getSurgeryById(id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // PATCH - Actualiza una cirugía existente
  @Patch(':id')
  updateSurgery(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSurgeryDto: UpdateSurgeryDto,
  ) {
    return this.surgeryOrchestrator.updateSurgery(id, updateSurgeryDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // DELETE - Elimina una cirugía y sus turnos asociados
  @Delete(':id')
  deleteSurgery(@Param('id', ParseIntPipe) id: number) {
    return this.surgeryOrchestrator.deleteSurgery(id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }


  @Post(':id/medics')
  addDoctorsToSurgery(
    @Param('id', ParseIntPipe) surgeryId: number,
    @Body() addDoctorsDto: AddDoctorsSurgeryDto,
  ) {
    return this.surgeryOrchestrator
      .addDoctorsToSurgery(surgeryId, addDoctorsDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id/medics')
  removeDoctorsFromSurgery(
    @Param('id', ParseIntPipe) surgeryId: number,
    @Body() removeDoctorsDto: RemoveDoctorsSurgeryDto,
  ) {
    return this.surgeryOrchestrator
      .removeDoctorsFromSurgery(surgeryId, removeDoctorsDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}