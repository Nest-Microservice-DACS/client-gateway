import { Module } from '@nestjs/common';

import { OperatingRoomController } from './operating-room.controller';
import { envs, OPERATING_ROOM_SERVICE } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OperatingRoomOrchestrator } from './operating-room.orchestrator';
import { OperatingRoomClient } from './clients/operating-room.client';

@Module({
  controllers: [OperatingRoomController],
  imports: [
    ClientsModule.register([
      {
        name: OPERATING_ROOM_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.OPERATING_ROOM_MS_HOST,
          port: envs.OPERATING_ROOM_MS_PORT,
        },
      },
    ]),
  ],
  providers: [OperatingRoomOrchestrator, OperatingRoomClient],
})
export class QuirofanosModule {}
