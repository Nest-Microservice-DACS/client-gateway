import { Module } from '@nestjs/common';
import { CirugiasController } from './cirugias.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CIRUGIAS_SERVICE, envs } from 'src/config';

@Module({
  controllers: [CirugiasController],
  imports: [
    ClientsModule.register([
      {
        name: CIRUGIAS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.CIRUGIAS_MS_HOST,
          port: envs.CIRUGIAS_MS_PORT,
        },
      },
    ]),
  ],
})
export class CirugiasModule {}
