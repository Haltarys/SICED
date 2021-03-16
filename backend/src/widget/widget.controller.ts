import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { WidgetService } from './widget.service';
import { WidgetDto } from './dto/widget.dto';

@Controller('widgets')
export class WidgetController {
  constructor(private readonly widgetService: WidgetService) {}

  @Get()
  findAll() {
    return this.widgetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.widgetService.findOne(id);
  }

  @Post()
  create(@Body() widgetDto: WidgetDto) {
    return this.widgetService.createLeaf(widgetDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() widgetDto: WidgetDto) {
    return this.widgetService.update(id, widgetDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.widgetService.deleteLeaf(id);
  }
}
