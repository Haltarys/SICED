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
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';
import { WidgetService } from 'src/widget/widget.service';
import { ObjectId } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Profile } from './profile.schema';

@Controller('profiles')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly widgetService: WidgetService,
  ) {}

  @Get()
  async findAll() {
    const profiles: Profile[] = await this.profileService.findAll();

    return await Promise.all(
      profiles.map(async (profile: Profile) => ({
        name: profile.name,
        widget: await this.widgetService.recursivelyFind(profile.widget),
      })),
    );
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    const profile = await this.profileService.findOne(name);

    if (profile) {
      return {
        name: profile.name,
        widget: await this.widgetService.recursivelyFind(profile.widget),
      };
    } else {
      throw new NotFoundException();
    }
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Delete(':name')
  async delete(@Param('name') name: string) {
    const profile = await this.profileService.findOne(name);

    if (!profile) return null;

    await this.widgetService.recursivelyDelete(profile.widget as ObjectId);

    return profile.delete();
  }
}
