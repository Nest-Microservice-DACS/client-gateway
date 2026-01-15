import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PATIENT_SERVICE } from 'src/config/services';
import { envs } from 'src/config/envs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PatientOrchestrator } from './patient.orchestrator';
import { PatientClient } from './clients/patient.client';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PatientController],
  providers: [PatientOrchestrator, PatientClient],
  imports: [
    AuthModule,
    ClientsModule.register([
      {
        name: PATIENT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.PATIENT_MS_HOST,
          port: envs.PATIENT_MS_PORT,
        },
      },
    ]),
  ],
})
export class PacientesModule {}
