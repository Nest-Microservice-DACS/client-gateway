import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { SCHEDULE_SERVICE, envs } from 'src/config';
import { ShiftOrchestrator } from './agenda.orchestrator';
import { ScheduleClient } from './clients/shift.client';

@Module({
  controllers: [ScheduleController],
  providers: [ShiftOrchestrator, ScheduleClient],
  imports: [
    ClientsModule.register([
      {
        name: SCHEDULE_SERVICE,
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
