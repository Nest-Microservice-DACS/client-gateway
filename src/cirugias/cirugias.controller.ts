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
import { CreateCirugiaDto } from './dto/create-cirugia.dto';
import { UpdateCirugiaDto } from './dto/update-cirugia.dto';
import { CirugiasOrchestrator } from './cirugias.orchestrator';
import { AuthGuard } from '@nestjs/passport';
import { AddMedicosCirugiaDto, RemoveMedicosCirugiaDto } from './dto';

/**
 * Controlador para gestionar cirugías
 * @UseGuards(AuthGuard('keycloak')) - Protege todas las rutas con autenticación JWT
 */
//@UseGuards(AuthGuard('keycloak'))
@Controller('cirugias')
export class CirugiasController {
  // Inyección del servicio orquestador que maneja la lógica de cirugías
  constructor(private readonly cirugiasOrchestrator: CirugiasOrchestrator) {}

  // POST - Crea una nueva cirugía
  @Post()
  createCirugia(@Body() createCirugiaDto: CreateCirugiaDto) {
    return this.cirugiasOrchestrator.createCirugia(createCirugiaDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // GET - Obtiene todas las cirugías con paginación
  @Get()
  getAllCirugias(@Query() paginationDto: PaginationDto) {
    return this.cirugiasOrchestrator.getAllCirugias(paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // GET - Obtiene una cirugía por su ID
  @Get(':id')
  getCirugiaById(@Param('id', ParseIntPipe) id: number) {
    return this.cirugiasOrchestrator.getCirugiaById(id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // PATCH - Actualiza una cirugía existente
  @Patch(':id')
  updateCirugia(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCirugiaDto: UpdateCirugiaDto,
  ) {
    return this.cirugiasOrchestrator.updateCirugia(id, updateCirugiaDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // DELETE - Elimina una cirugía y sus turnos asociados
  @Delete(':id')
  deleteCirugia(@Param('id', ParseIntPipe) id: number) {
    return this.cirugiasOrchestrator.deleteCirugia(id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }


  @Post(':id/medicos')
  addMedicosToCirugia(
    @Param('id', ParseIntPipe) cirugiaId: number,
    @Body() addMedicosDto: AddMedicosCirugiaDto,
  ) {
    return this.cirugiasOrchestrator
      .addMedicosToCirugia(cirugiaId, addMedicosDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id/medicos')
  removeMedicosFromCirugia(
    @Param('id', ParseIntPipe) cirugiaId: number,
    @Body() removeMedicosDto: RemoveMedicosCirugiaDto,
  ) {
    return this.cirugiasOrchestrator
      .removeMedicosFromCirugia(cirugiaId, removeMedicosDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}