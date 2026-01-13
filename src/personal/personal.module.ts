import { Module } from '@nestjs/common';
import { PersonalController } from './personal.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PERSONAL_SERVICE } from 'src/config';
import { PersonalOrchestrator } from './personal.orchestrator';
import { PersonalClient } from './clients/personal.client';

@Module({
  controllers: [PersonalController],
  imports: [
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
  ],
  providers: [PersonalOrchestrator, PersonalClient],
})
export class PersonalModule {}
