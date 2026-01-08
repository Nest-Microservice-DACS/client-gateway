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
import { CirugiasService } from './cirugias.service';

@Controller('cirugias')
export class CirugiasController {
  constructor(private readonly cirugiasService: CirugiasService) {}

  @Post()
  createCirugia(@Body() createCirugiaDto: CreateCirugiaDto) {
    return this.cirugiasService.createCirugia(createCirugiaDto);
  }

  @Get()
  getAllCirugias(@Query() paginationDto: PaginationDto) {
    return this.cirugiasService.getAllCirugias(paginationDto);
  }

  @Get(':id')
  async getCirugiaById(@Param('id', ParseIntPipe) id: number) {
    return this.cirugiasService.getCirugiaById(id).pipe(
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
    return this.cirugiasService.updateCirugia(id, updateCirugiaDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Delete(':id')
  deleteCirugia(@Param('id', ParseIntPipe) id: number) {
    return this.cirugiasService.deleteCirugia(id).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
