import { Module } from '@nestjs/common';
import { ServiciosController } from './service.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_SERVICE } from 'src/config/services';
import { envs } from 'src/config';
import { ServicesOrchestrator } from './service.orchestrator';
import { ServiciosClient } from './clients/service.client';

@Module({
  controllers: [ServiciosController],
  imports: [
    ClientsModule.register([
      {
        name: SERVICE_SERVICE,
        transport: Transport.TCP,
        options: { host: envs.SERVICE_MS_HOST, port: envs.SERVICE_MS_PORT },
      },
    ]),
  ],
  providers: [ServicesOrchestrator, ServiciosClient],
})
export class ServiciosModule {}
