import { Module } from '@nestjs/common';
import { SurgeryController } from './surgery.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SCHEDULE_SERVICE, SURGERY_SERVICE, envs, PATIENT_SERVICE, PERSONAL_SERVICE, SERVICE_SERVICE, OPERATING_ROOM_SERVICE } from 'src/config';
import { SurgeryOrchestrator } from './surgery.orchestrator';
import { PatientClient } from 'src/pacientes/clients/patient.client';
import { SurgeryClient } from './clients/surgery.client';
import { OperatingRoomClient } from 'src/quirofanos/clients/operating-room.client';
import { ServiciosClient } from 'src/servicios/clients/service.client';
import { PersonalClient } from 'src/personal/clients/personal.client';
import { ScheduleClient } from 'src/agenda/clients/shift.client';

@Module({
  controllers: [SurgeryController],
  imports: [
    // Microservicios registrados con sus respectivas configuraciones
    ClientsModule.register([
      {
        name: SURGERY_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.SURGERY_MS_HOST,
          port: envs.SURGERY_MS_PORT,
        },
      },
    ]),
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
    ClientsModule.register([
      {
        name: SERVICE_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.SERVICE_MS_HOST,
          port: envs.SERVICE_MS_PORT,
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
        name: SCHEDULE_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.AGENDA_MS_HOST,
          port: envs.AGENDA_MS_PORT,
        },
      },
    ]),
  ],
  providers: [
    SurgeryOrchestrator,
    SurgeryClient,
    PatientClient,
    OperatingRoomClient,
    ServiciosClient,
    PersonalClient,
    ScheduleClient,
  ],
})
export class SurgeryModule {}
