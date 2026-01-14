import { Module } from '@nestjs/common';
import { CirugiasController } from './cirugias.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AGENDA_SERVICE, CIRUGIAS_SERVICE, envs, PACIENTES_SERVICE, PERSONAL_SERVICE, QUIROFANOS_SERVICE, SERVICIOS_SERVICE } from 'src/config';
import { CirugiasOrchestrator } from './cirugias.orchestrator';
import { PacientesClient } from 'src/pacientes/clients/pacientes.client';
import { CirugiasClient } from './clients/cirugias.client';
import { QuirofanosClient } from 'src/quirofanos/clients/quirofanos.client';
import { ServiciosClient } from 'src/servicios/clients/servicios.client';
import { PersonalClient } from 'src/personal/clients/personal.client';
import { AgendaClient } from 'src/agenda/clients/agenda.client';

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
    ClientsModule.register([
      {
        name: QUIROFANOS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.QUIROFANOS_MS_HOST,
          port: envs.QUIROFANOS_MS_PORT,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: SERVICIOS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.SERVICIOS_MS_HOST,
          port: envs.SERVICIOS_MS_PORT,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: PERSONAL_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.PERSONAL_MS_HOST,
          port: envs.PERSONAL_MS_PORT,
        },
      },
    ]), 
    ClientsModule.register([
      {
        name: AGENDA_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.AGENDA_MS_HOST,
          port: envs.AGENDA_MS_PORT,
        },
      },
    ]),
  ],
  providers: [
    CirugiasOrchestrator,
    CirugiasClient,
    PacientesClient,
    QuirofanosClient,
    ServiciosClient,
    PersonalClient,
    AgendaClient,
  ],
})
export class CirugiasModule {}
