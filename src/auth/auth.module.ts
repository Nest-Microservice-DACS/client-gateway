import { Module } from '@nestjs/common';
import { KeycloakStrategy } from './strategy/keycloak.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';


@Module({
  controllers: [],
  providers: [KeycloakStrategy],
  imports: [PassportModule,ConfigModule],
  exports: [PassportModule],
})
export class AuthModule {}
