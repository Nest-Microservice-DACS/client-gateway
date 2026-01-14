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
export class PersonalController {
  constructor(private readonly personalOrchestrator: PersonalOrchestrator) {}

  @Post()
  create(@Body() createPersonalDto: CreatePersonalDto) {
    return this.personalOrchestrator.createPersonal(createPersonalDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAll(@Query() personalPaginationDto: PersonalPaginationDto) {
    return this.personalOrchestrator.getAllPersonal(personalPaginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

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

  @Get('id/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.personalOrchestrator.getPersonalById(id).pipe(
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
    return this.personalOrchestrator.updatePersonal(id, updatePersonalDto).pipe(
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
    return this.personalOrchestrator
      .changeStatusPersonal(id, changeStatusPersonalDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
