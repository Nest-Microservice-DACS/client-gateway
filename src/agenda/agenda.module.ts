import { Module } from '@nestjs/common';
import { AgendaController } from './agenda.controller';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { AGENDA_SERVICE, envs } from 'src/config';

@Module({
  controllers: [AgendaController],
  providers: [],
  imports: [
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
})
export class AgendaModule {}
