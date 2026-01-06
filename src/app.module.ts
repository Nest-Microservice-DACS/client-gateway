import { Module } from '@nestjs/common';
import { CirugiasModule } from './cirugias/cirugias.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { PersonalModule } from './personal/personal.module';

@Module({
  imports: [CirugiasModule, PacientesModule, PersonalModule],
})    
export class AppModule {}
