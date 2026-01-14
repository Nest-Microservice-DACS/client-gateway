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
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { PersonalOrchestrator } from './personal.orchestrator';
import { ChangeStatusPersonalDto, PersonalStatusDto } from './dto';
import { catchError } from 'rxjs';
import { PersonalPaginationDto } from './dto/personal-pagination.dto';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('keycloak'))
@Controller('personal')
// Controlador para gestionar personal médico
export class PersonalController {
  // Inyectar orquestador de personal
  constructor(private readonly personalOrchestrator: PersonalOrchestrator) {}

  // POST - Crear nuevo personal
  @Post()
  create(@Body() createPersonalDto: CreatePersonalDto) {
    return this.personalOrchestrator.createPersonal(createPersonalDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // GET - Obtener todo el personal con paginación
  @Get()
  findAll(@Query() personalPaginationDto: PersonalPaginationDto) {
    return this.personalOrchestrator.getAllPersonal(personalPaginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // GET - Obtener personal por estado
  @Get(':status')
  findByStatus(
    @Param() status: PersonalStatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.personalOrchestrator
      .getAllPersonal({ ...paginationDto, status: status.status })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  // GET - Obtener personal por ID
  @Get('id/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.personalOrchestrator.getPersonalById(id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // PATCH - Actualizar personal
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonalDto: UpdatePersonalDto,
  ) {
    return this.personalOrchestrator.updatePersonal(id, updatePersonalDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  // PATCH - Cambiar estado del personal
  @Patch('status/:id')
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeStatusPersonalDto: ChangeStatusPersonalDto,
  ) {
    return this.personalOrchestrator
      .changeStatusPersonal(id, changeStatusPersonalDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
