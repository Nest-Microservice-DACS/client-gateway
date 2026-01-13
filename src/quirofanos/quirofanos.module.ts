import { Module } from '@nestjs/common';

import { QuirofanosController } from './quirofanos.controller';
import { envs, QUIROFANOS_SERVICE } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QuirofanosOrchestrator } from './quirofanos.orchestrator';
import { QuirofanosClient } from './clients/quirofanos.client';

@Module({
  controllers: [QuirofanosController],
  imports: [
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
  ],
  providers: [QuirofanosOrchestrator, QuirofanosClient],
})
export class QuirofanosModule {}
