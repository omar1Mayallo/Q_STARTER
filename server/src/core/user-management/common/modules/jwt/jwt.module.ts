import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtService } from './jwt.service';

@Global()
@Module({
  imports: [
    Jwt.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_DATE'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
