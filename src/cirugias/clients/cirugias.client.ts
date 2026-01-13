import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CIRUGIAS_SERVICE } from 'src/config';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateCirugiaDto, UpdateCirugiaDto } from '../dto';



@Injectable()
export class CirugiasClient {
  constructor(
    @Inject(CIRUGIAS_SERVICE)
    private readonly cirugiasClient: ClientProxy,
  ) {}

  createCirugia(dto: CreateCirugiaDto) {
    return this.cirugiasClient.send({ cmd: 'create_cirugia' }, dto);
  }

  getAllCirugias(paginationDto: PaginationDto) {
    return this.cirugiasClient.send({ cmd: 'get_cirugias' }, paginationDto);
  }

  getCirugiaById(id: number) {
    return this.cirugiasClient.send({ cmd: 'get_cirugia_by_id' }, { id });
  }

  updateCirugia(id: number, dto: UpdateCirugiaDto) {
    return this.cirugiasClient.send({ cmd: 'update_cirugia' }, { id, ...dto });
  }

  deleteCirugia(id: number) {
    return this.cirugiasClient.send({ cmd: 'delete_cirugia' }, { id });
  }
}
