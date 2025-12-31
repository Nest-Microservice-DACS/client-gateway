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

@Controller('cirugias')
export class CirugiasController {
  constructor(
    @Inject('CIRUGIAS_SERVICE') private readonly cirugiasClient: ClientProxy,
  ) {}

  @Post()
  createCirugia(@Body() createCirugiaDto: CreateCirugiaDto) {
    return this.cirugiasClient.send(
      { cmd: 'create_cirugia' },
      createCirugiaDto,
    );
  }

  @Get()
  getAllCirugias(@Query() paginationDto: PaginationDto) {
    return this.cirugiasClient.send({ cmd: 'get_cirugias' }, paginationDto);
  }

  @Get(':id')
  async getCirugiaById(@Param('id', ParseIntPipe) id: number) {
    // Using pipe and catchError to handle exceptions
    return this.cirugiasClient.send({ cmd: 'get_cirugia_by_id' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );

    // Alternatively, using firstValueFrom with try-catch
    // try {
    //   const cirugia = await firstValueFrom(
    //     this.cirugiasClient.send({ cmd: 'get_cirugia_by_id' }, { id }),
    //   );
    //   return cirugia;
    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Patch(':id')
  updateCirugia(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCirugiaDto: UpdateCirugiaDto,
  ) {
    return this.cirugiasClient
      .send({ cmd: 'update_cirugia' }, { id, ...updateCirugiaDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  deleteCirugia(@Param('id', ParseIntPipe) id: number) {
    return this.cirugiasClient.send({ cmd: 'delete_cirugia' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
