import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import {
  DB_URL,
  DB_NAME,
  DB_ADMIN_USER,
  DB_ADMIN_PASSWORD,
} from './config/config';
import { WidgetModule } from './widget/widget.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ImgurModule } from './imgur/imgur.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    MongooseModule.forRoot(DB_URL, {
      dbName: DB_NAME,
      auth: {
        user: DB_ADMIN_USER,
        password: DB_ADMIN_PASSWORD,
      },
      retryWrites: true,
      writeConcern: {
        w: 'majority',
      },
    }),
    ProfileModule,
    WidgetModule,
    AuthModule,
    UsersModule,
    ImgurModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
