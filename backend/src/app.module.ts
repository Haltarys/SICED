import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfilesModule } from './profiles/profiles.module';
import {
  DB_URL,
  DB_NAME,
  DB_ADMIN_USER,
  DB_ADMIN_PASSWORD,
} from './config/config';

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
    ProfilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
