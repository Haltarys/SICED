import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';
import { WidgetService } from 'src/widget/widget.service';
import { ObjectId } from 'mongoose';

@Controller('profiles')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly widgetService: WidgetService,
  ) {}

  @Get()
  async findAll() {
    const profiles = await this.profileService.findAll();

    return profiles.map(async (profile) => ({
      name: profile.name,
      widget: await this.widgetService.recursivelyFind(profile.widget),
    }));
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    const profile = await this.profileService.findOne(name);

    return {
      name: profile.name,
      widget: await this.widgetService.recursivelyFind(profile.widget),
    };
  }

  @Post()
  async create(@Body() profileDto: ProfileDto) {
    try {
      const widget = await this.widgetService.recursivelyCreate(
        profileDto.widget,
      );

      return await this.profileService.create(profileDto.name, widget.id);
    } catch (e) {
      if (e.name === 'MongoError' && e.code === 11000) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          error: 'Cannot have profiles with the same name.',
        });
      }
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: String(e),
      });
    }
  }

  @Put(':name')
  async update(@Param('name') name: string, @Body() profileDto: ProfileDto) {
    try {
      const profile = await this.profileService.findOne(name);

      await this.widgetService.recursivelyDelete(profile.widget as ObjectId);

      const widget = await this.widgetService.recursivelyCreate(
        profileDto.widget,
      );
      profile.name = profileDto.name;
      profile.widget = widget.id;

      return await profile.save();
    } catch (e) {
      console.log(e);
      if (e.name === 'MongoError' && e.code === 11000) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          error: 'Cannot have profiles with the same name.',
        });
      }
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: String(e),
      });
    }
  }

  @Delete(':name')
  async delete(@Param('name') name: string) {
    const profile = await this.profileService.findOne(name);

    if (!profile) return null;

    await this.widgetService.recursivelyDelete(profile.widget as ObjectId);

    return profile.delete();
  }
}
