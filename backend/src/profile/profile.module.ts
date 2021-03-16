import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './profile.schema';
import { Widget, WidgetSchema } from 'src/widget/widget.schema';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { WidgetService } from 'src/widget/widget.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: Widget.name, schema: WidgetSchema },
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, WidgetService],
})
export class ProfileModule {}
