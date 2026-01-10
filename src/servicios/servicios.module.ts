import { Module } from '@nestjs/common';
import { ServiciosController } from './servicios.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICIOS_SERVICE } from 'src/config/services';
import { envs } from 'src/config';

@Module({
  controllers: [ServiciosController],
  imports: [
    ClientsModule.register([
      {
        name: SERVICIOS_SERVICE,
        transport: Transport.TCP,
        options: { host: envs.SERVICIOS_MS_HOST, port: envs.SERVICIOS_MS_PORT },
      },
    ]),
  ],
})
export class ServiciosModule {}
