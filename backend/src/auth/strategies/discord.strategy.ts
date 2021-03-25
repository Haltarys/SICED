import { PassportStrategy } from '@nestjs/passport';
import { HttpService, Injectable } from '@nestjs/common';
import { Strategy } from 'passport-oauth2';
import { stringify } from 'querystring';
import {
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_CALLBACK_URL,
} from 'src/config/config';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(private readonly httpService: HttpService) {
    super({
      authorizationURL: `https://discord.com/api/oauth2/authorize?${stringify({
        client_id: DISCORD_CLIENT_ID,
        redirect_uri: DISCORD_CALLBACK_URL,
        response_type: 'code',
        scope: 'identify',
      })}`,
      tokenURL: 'https://discordapp.com/api/oauth2/token',
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: DISCORD_CALLBACK_URL,
      scope: ['identify'],
    });
  }

  async validate(accessToken: string): Promise<any> {
    const { data } = await this.httpService
      .get('https://discordapp.com/api/users/@me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .toPromise();

    return { accessToken, ...data };
  }
}
