import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICIOS_SERVICE } from 'src/config';
import { CreateServicioDto } from '../dto/create-servicio.dto';
import { UpdateServicioDto } from '../dto/update-servicio.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ServiciosClient {
  constructor(
    @Inject(SERVICIOS_SERVICE)
    private readonly serviciosClient: ClientProxy,
  ) {}

  createServicio(createServicioDto: CreateServicioDto) {
    return this.serviciosClient.send(
      { cmd: 'create_servicio' },
      createServicioDto,
    );
  }

  getAllServicios(paginationDto: PaginationDto) {
    return this.serviciosClient.send({ cmd: 'get_servicios' }, paginationDto);
  }

  getServicioById(id: number) {
    return this.serviciosClient.send({ cmd: 'get_servicio_by_id' }, id);
  }

  updateServicio(id: number, updateServicioDto: UpdateServicioDto) {
    return this.serviciosClient.send(
      { cmd: 'update_servicio' },
      { id, ...updateServicioDto },
    );
  }

  deleteServicio(id: number) {
    return this.serviciosClient.send({ cmd: 'remove_servicio' }, id);
  }
}
