import { Module } from '@nestjs/common';
import { CirugiasModule } from './cirugias/cirugias.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { PersonalModule } from './personal/personal.module';
import { QuirofanosModule } from './quirofanos/quirofanos.module';
import { ServiciosModule } from './servicios/servicios.module';
import { AgendaModule } from './agenda/agenda.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    CirugiasModule,
    PacientesModule,
    PersonalModule,
    QuirofanosModule,
    ServiciosModule,
    AgendaModule,
  ],
})
export class AppModule {}
