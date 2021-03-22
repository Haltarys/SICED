import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WidgetService } from './widget.service';
import { WidgetDto } from './dto/widget.dto';
import { WidgetType } from './widget-type.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() widgetDto: WidgetDto) {
    return this.widgetService.recursivelyCreate(widgetDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() widgetDto: WidgetDto) {
    const widget = await this.widgetService.findOne(id);

    if (!widget) return null;
    if ((widget.type as WidgetType) === WidgetType.SplitVertical) {
      await this.widgetService.recursivelyDelete(widget.left);
      await this.widgetService.recursivelyDelete(widget.right);
    } else if ((widget.type as WidgetType) === WidgetType.SplitHorizontal) {
      await this.widgetService.recursivelyDelete(widget.top);
      await this.widgetService.recursivelyDelete(widget.bottom);
    }

    if ((widget.type as WidgetType) === WidgetType.SplitVertical) {
      const left = await this.widgetService.recursivelyCreate(widgetDto.left);
      const right = await this.widgetService.recursivelyCreate(widgetDto.right);

      widget.left = left.id;
      widget.right = right.id;
    } else if ((widget.type as WidgetType) === WidgetType.SplitHorizontal) {
      const top = await this.widgetService.recursivelyCreate(widgetDto.top);
      const bottom = await this.widgetService.recursivelyCreate(
        widgetDto.bottom,
      );

      widget.top = top.id;
      widget.bottom = bottom.id;
    } else {
      widget.left = undefined;
      widget.right = undefined;
    }

    widget.type = widgetDto.type;
    widget.data = widgetDto.data || undefined;

    return await widget.save();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const widget = await this.findOne(id);

    return this.widgetService.recursivelyDelete(widget.id);
  }
}
