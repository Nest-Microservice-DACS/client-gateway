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

import { QuirofanosOrchestrator } from './quirofanos.orchestrator';
import {
  ChangeQuirofanoStatusDto,
  CreateQuirofanoDto,
  UpdateQuirofanoDto,
} from './dto';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('keycloak'))
@Controller('quirofanos')
export class QuirofanosController {
  constructor(
    private readonly quirofanosOrchestrator: QuirofanosOrchestrator,
  ) {}

  @Post()
  create(@Body() createQuirofanoDto: CreateQuirofanoDto) {
    return this.quirofanosOrchestrator.createQuirofano(createQuirofanoDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.quirofanosOrchestrator.getAllQuirofanos(paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quirofanosOrchestrator.getQuirofanoById(id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuirofanoDto: UpdateQuirofanoDto,
  ) {
    return this.quirofanosOrchestrator
      .updateQuirofano(id, updateQuirofanoDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Patch('status/:id')
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeQuirofanoStatusDto: ChangeQuirofanoStatusDto,
  ) {
    return this.quirofanosOrchestrator
      .changeStatusQuirofano(id, changeQuirofanoStatusDto)
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
