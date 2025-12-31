import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { Console } from 'console';
import { catchError, first, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';

@Controller('cirugias')
export class CirugiasController {
  constructor(
    @Inject('CIRUGIAS_SERVICE') private readonly cirugiasClient: ClientProxy,
  ) {}

  @Post()
  createCirugia(@Body() createData: any) {
    return 'This action adds a new cirugia';
  }

  @Get()
  getAllCirugias(@Query() paginationDto: PaginationDto) {
    return this.cirugiasClient.send({ cmd: 'get_cirugias' }, paginationDto);
  }

  @Get(':id')
  async getCirugiaById(@Param('id') id: string) {
    // Using pipe and catchError to handle exceptions
    return this.cirugiasClient.send({ cmd: 'get_cirugia_by_id' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
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
  updateCirugia(@Param('id') id: string, @Body() updateData: any) {
    return 'This action updates a cirugia';
  }

  @Delete(':id')
  deleteCirugia(@Param('id') id: string) {
    return 'This action deletes a cirugia';
  }
}
