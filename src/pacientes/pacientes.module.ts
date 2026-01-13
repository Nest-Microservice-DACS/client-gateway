import { Module } from '@nestjs/common';
import { PacientesController } from './pacientes.controller';
import { PACIENTES_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PacientesOrchestrator } from './pacientes.orchestrator';
import { PacientesClient } from './clients/pacientes.client';

@Module({
  controllers: [PacientesController],
  providers: [PacientesOrchestrator,PacientesClient],
  imports: [ ClientsModule.register([
    {
      name: PACIENTES_SERVICE,
      transport: Transport.TCP,
      options: {
        host: envs.PACIENTES_MS_HOST,
        port: envs.PACIENTES_MS_PORT,
      },
    },
  ]), ],
})
export class PacientesModule {}
