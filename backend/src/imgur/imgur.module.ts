import { Module, HttpModule } from '@nestjs/common';
import { ImgurService } from './imgur.service';
import { ImgurController } from './imgur.controller';
import { IMGUR_CLIENT_ID } from 'src/config/config';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://api.imgur.com/3',
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
      },
    }),
  ],
  providers: [ImgurService],
  controllers: [ImgurController],
})
export class ImgurModule {}
