import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Console } from 'console';
import { catchError, first, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CreateCirugiaDto } from './dto/create-cirugia.dto';
import { UpdateCirugiaDto } from './dto/update-cirugia.dto';
import { CirugiasOrchestrator } from './cirugias.orchestrator';

@Controller('cirugias')
export class CirugiasController {
  constructor(private readonly cirugiasOrchestrator: CirugiasOrchestrator) {}

  @Post()
  createCirugia(@Body() createCirugiaDto: CreateCirugiaDto) {
    return this.cirugiasOrchestrator.createCirugia(createCirugiaDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  getAllCirugias(@Query() paginationDto: PaginationDto) {
    return this.cirugiasOrchestrator.getAllCirugias(paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  getCirugiaById(@Param('id', ParseIntPipe) id: number) {
    return this.cirugiasOrchestrator.getCirugiaById(id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

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

  @Delete(':id')
  deleteCirugia(@Param('id', ParseIntPipe) id: number) {
    return this.cirugiasOrchestrator.deleteCirugia(id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
