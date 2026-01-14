import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KeycloakStrategy } from './strategy/keycloak.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';


@Module({
  controllers: [AuthController],
  providers: [AuthService,KeycloakStrategy],
  imports: [PassportModule,ConfigModule],
  exports: [PassportModule],
})
export class AuthModule {}
