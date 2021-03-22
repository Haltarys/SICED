import { HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JWT_SECRET_KEY } from 'src/config/config';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DiscordStrategy } from './strategies/discord.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    HttpModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, DiscordStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
