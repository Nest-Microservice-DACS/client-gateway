import { Module } from '@nestjs/common';
import { CirugiasModule } from './cirugias/cirugias.module';
import { PacientesModule } from './pacientes/pacientes.module';

@Module({
  imports: [CirugiasModule, PacientesModule],
})    
export class AppModule {}
