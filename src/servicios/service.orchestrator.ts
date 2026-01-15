import { Injectable } from '@nestjs/common';
import { ServiciosClient as ServicesClient } from './clients/service.client';

@Injectable()
export class ServicesOrchestrator {
  constructor(private readonly servicesClient: ServicesClient) {}

  createService(dto: any) {
    return this.servicesClient.createService(dto);
  }

  getAllServices(paginationDto: any) {
    return this.servicesClient.getAllServices(paginationDto);
  }

  getServiceById(id: number) {
    return this.servicesClient.getServiceById(id);
  }

  updateServices(id: number, dto: any) {
    return this.servicesClient.updateServices(id, dto);
  }

  deleteService(id: number) {
    return this.servicesClient.deleteService(id);
  }
}
