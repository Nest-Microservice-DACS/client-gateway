import { Module } from '@nestjs/common';
import { ServiciosController } from './servicios.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICIOS_SERVICE } from 'src/config/services';
import { envs } from 'src/config';
import { ServiciosOrchestrator } from './servicios.orchestrator';
import { ServiciosClient } from './clients/servicios.client';

@Module({
  controllers: [ServiciosController],
  imports: [
    ClientsModule.register([
      {
        name: SERVICIOS_SERVICE,
        transport: Transport.TCP,
        options: { host: envs.SERVICIOS_MS_HOST, port: envs.SERVICIOS_MS_PORT },
      },
    ]),
  ],
  providers: [ServiciosOrchestrator, ServiciosClient],
})
export class ServiciosModule {}
