import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Profile, ProfileDocument } from './profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async findAll() {
    const profiles = await this.profileModel.find().exec();

    return profiles;
  }

  async findOne(name: string) {
    const profile = await this.profileModel.findOne({ name }).exec();

    return profile;
  }

  async create(name: string, widgetId: ObjectId) {
    const profile = new this.profileModel();
    profile.name = name;
    profile.widget = widgetId;

    return await profile.save();
  }
}
