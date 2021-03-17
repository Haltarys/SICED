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
import { isSplitWidget } from './widget.utils';
import { WidgetType } from './widget-type.enum';

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
    return this.widgetService.recursivelyCreate(widgetDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() widgetDto: WidgetDto) {
    const widget = await this.widgetService.findOne(id);

    if (!widget) return null;
    if (isSplitWidget(widget.type as WidgetType)) {
      await this.widgetService.recursivelyDelete(widget.left);
      await this.widgetService.recursivelyDelete(widget.right);
    }
    if (isSplitWidget(widgetDto.type)) {
      const left = await this.widgetService.recursivelyCreate(widgetDto.left);
      const right = await this.widgetService.recursivelyCreate(widgetDto.right);

      widget.left = left.id;
      widget.right = right.id;
    } else {
      widget.left = undefined;
      widget.right = undefined;
    }
    widget.type = widgetDto.type;
    widget.data = widgetDto.data || undefined;

    return await widget.save();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const widget = await this.findOne(id);

    return this.widgetService.recursivelyDelete(widget.id);
  }
}
