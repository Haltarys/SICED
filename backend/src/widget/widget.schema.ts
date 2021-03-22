import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type WidgetDocument = Widget & Document;

@Schema({ versionKey: false })
export class Widget {
  @Prop({ required: true })
  type: string;

  @Prop({ type: Types.ObjectId })
  left?: ObjectId;

  @Prop({ type: Types.ObjectId })
  right?: ObjectId;

  @Prop({ type: Types.ObjectId })
  top?: ObjectId;

  @Prop({ type: Types.ObjectId })
  bottom?: ObjectId;

  @Prop()
  data?: string;
}

export const WidgetSchema = SchemaFactory.createForClass(Widget);
