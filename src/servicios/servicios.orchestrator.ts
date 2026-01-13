import { Injectable } from '@nestjs/common';
import { ServiciosClient } from './clients/servicios.client';

@Injectable()
export class ServiciosOrchestrator {
  constructor(private readonly serviciosClient: ServiciosClient) {}

  createServicio(dto: any) {
    return this.serviciosClient.createServicio(dto);
  }

  getAllServicios(paginationDto: any) {
    return this.serviciosClient.getAllServicios(paginationDto);
  }

  getServicioById(id: number) {
    return this.serviciosClient.getServicioById(id);
  }

  updateServicio(id: number, dto: any) {
    return this.serviciosClient.updateServicio(id, dto);
  }

  deleteServicio(id: number) {
    return this.serviciosClient.deleteServicio(id);
  }
}
