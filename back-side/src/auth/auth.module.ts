import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SAMLStrategy } from './saml.strategy';

@Module({
  imports: [PassportModule],
  providers: [SAMLStrategy],
})
export class AuthModule {}
