import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ versionKey: false })
export class Profile {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
  })
  widget: ObjectId;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
