import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Widget, WidgetSchema } from './widget.schema';
import { WidgetController } from './widget.controller';
import { WidgetService } from './widget.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Widget.name, schema: WidgetSchema }]),
  ],
  controllers: [WidgetController],
  providers: [WidgetService],
})
export class WidgetModule {}
