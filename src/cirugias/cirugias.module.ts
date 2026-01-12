import { Module } from '@nestjs/common';
import { CirugiasController } from './cirugias.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CIRUGIAS_SERVICE, envs, PACIENTES_SERVICE } from 'src/config';
import { CirugiasOrchestrator } from './cirugias.orchestrator';
import { CirugiasClient } from './cirugias.client';
import { PacientesClient } from 'src/pacientes/pacientes.client';

@Module({
  controllers: [CirugiasController],
  imports: [
    ClientsModule.register([
      {
        name: CIRUGIAS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.CIRUGIAS_MS_HOST,
          port: envs.CIRUGIAS_MS_PORT,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: PACIENTES_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.PACIENTES_MS_HOST,
          port: envs.PACIENTES_MS_PORT,
        },
      },
    ]),
  ],
  providers: [
    CirugiasOrchestrator,
    CirugiasClient,
    PacientesClient,
  ],
})
export class CirugiasModule {}
