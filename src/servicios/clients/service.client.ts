import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICE_SERVICE } from 'src/config';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from '../dto/update-service.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ServiciosClient {
  constructor(
    @Inject(SERVICE_SERVICE)
    private readonly serviceClient: ClientProxy,
  ) {}

  createService(createServiceDto: CreateServiceDto) {
    return this.serviceClient.send(
      { cmd: 'create_servicio' },
      createServiceDto,
    );
  }

  getAllServices(paginationDto: PaginationDto) {
    return this.serviceClient.send({ cmd: 'get_servicios' }, paginationDto);
  }

  getServiceById(id: number) {
    return this.serviceClient.send({ cmd: 'get_service_by_id' }, id);
  }

  updateServices(id: number, updateServiceDto: UpdateServiceDto) {
    return this.serviceClient.send(
      { cmd: 'update_service' },
      { id, ...updateServiceDto },
    );
  }

  deleteService(id: number) {
    return this.serviceClient.send({ cmd: 'remove_servicio' }, id);
  }
}
