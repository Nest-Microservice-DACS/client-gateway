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
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { PERSONAL_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ChangeStatusPersonalDto } from './dto';
import { catchError } from 'rxjs';
import { PersonalPaginationDto } from './dto/personal-pagination.dto';
import { PacienteStatusDto } from 'src/pacientes/dto';
import { PaginationDto } from 'src/common';

@Controller('personal')
export class PersonalController {
  constructor(
    @Inject(PERSONAL_SERVICE) private readonly personalService: ClientProxy,
  ) {}

  @Post()
  create(@Body() createPersonalDto: CreatePersonalDto) {
    return this.personalService
      .send({ cmd: 'create_personal' }, createPersonalDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get()
  findAll(@Query() personalPaginationDto: PersonalPaginationDto) {
    return this.personalService.send({ cmd: 'find_all_personal' }, personalPaginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':status')
  findByStatus(@Param() status: PacienteStatusDto, @Query() paginationDto: PaginationDto) {
    return this.personalService
      .send({ cmd: 'find_all_personal' }, { ...paginationDto, status: status.status })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get('id/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.personalService.send({ cmd: 'find_one_personal' }, id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonalDto: UpdatePersonalDto,
  ) {
    return this.personalService
      .send({ cmd: 'update_personal' }, { id, updatePersonalDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Patch('status/:id')
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeStatusPersonalDto: ChangeStatusPersonalDto,
  ) {
    return this.personalService
      .send(
        { cmd: 'change_status_personal' },
        { id, ...changeStatusPersonalDto },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
