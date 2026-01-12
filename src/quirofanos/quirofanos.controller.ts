import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { ClientProxy, RpcException } from '@nestjs/microservices';
import { QUIROFANOS_SERVICE } from 'src/config';
import {
  ChangeQuirofanoStatusDto,
  CreateQuirofanoDto,
  UpdateQuirofanoDto,
} from './dto';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';

@Controller('quirofanos')
export class QuirofanosController {
  @Inject(QUIROFANOS_SERVICE) private readonly quirofanosService: ClientProxy;

  @Post()
  create(@Body() createQuirofanoDto: CreateQuirofanoDto) {
    return this.quirofanosService.send(
      { cmd: 'create_quirofano' },
      createQuirofanoDto,
    ).pipe(
      catchError((error) => {
        throw new RpcException(error.message);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.quirofanosService.send(
      { cmd: 'find_all_quirofanos' },
      paginationDto,
    ).pipe(
      catchError((error) => {
        throw new RpcException(error.message);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quirofanosService.send({ cmd: 'find_one_quirofano' }, id).pipe(
      catchError((error) => {
        throw new RpcException(error.message);
      }),
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuirofanoDto: UpdateQuirofanoDto,
  ) {
    return this.quirofanosService
      .send(
        { cmd: 'update_quirofano' },
        {
          id,
          ...updateQuirofanoDto,
        },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error.message);
        }),
      );
  }

  @Patch('status/:id')
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() changeQuirofanoStatusDto: ChangeQuirofanoStatusDto,
  ) {
    return this.quirofanosService
      .send(
        { cmd: 'change_quirofano_status' },
        { id, ...changeQuirofanoStatusDto },
      )
      .pipe(
        catchError((error) => {
          throw new RpcException(error.message);
        }),
      );
  }
}
