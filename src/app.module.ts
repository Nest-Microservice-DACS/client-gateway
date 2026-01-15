import { Module } from '@nestjs/common';

import { PacientesModule } from './pacientes/patient.module';
import { PersonalModule } from './personal/personal.module';
import { QuirofanosModule } from './quirofanos/operating-room.module';
import { ServiciosModule } from './servicios/service.module';
import { AgendaModule } from './agenda/agenda.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SurgeryModule } from './cirugias/surgery.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    SurgeryModule,
    PacientesModule,
    PersonalModule,
    QuirofanosModule,
    ServiciosModule,
    AgendaModule,
  ],
})
export class AppModule {}
