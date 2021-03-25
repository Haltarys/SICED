import { Controller, Get, Param } from '@nestjs/common';
import { ImgurService } from './imgur.service';

@Controller('imgur')
export class ImgurController {
  constructor(private readonly imgurService: ImgurService) {}

  @Get('image/:id')
  getImageInfoById(@Param('id') id: string) {
    return this.imgurService.getImageInfoById(id);
  }
}
