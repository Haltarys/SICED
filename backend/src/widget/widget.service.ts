import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { WidgetDto } from './dto/widget.dto';
import { WidgetType } from './widget-type.enum';
import { Widget, WidgetDocument } from './widget.schema';

@Injectable()
export class WidgetService {
  constructor(
    @InjectModel(Widget.name) private widgetModel: Model<WidgetDocument>,
  ) {}

  async findAll() {
    const widgets = await this.widgetModel.find().exec();

    return widgets;
  }

  async findOne(id: string) {
    const widget = await this.widgetModel.findById(id).exec();

    return widget;
  }

  async recursivelyFind(id: ObjectId) {
    const widget = await this.widgetModel.findById(id).exec();

    if ((widget.type as WidgetType) === WidgetType.SplitVertical) {
      return {
        type: widget.type,
        left: await this.recursivelyFind(widget.left),
        right: await this.recursivelyFind(widget.right),
      };
    } else if ((widget.type as WidgetType) === WidgetType.SplitHorizontal) {
      return {
        type: widget.type,
        top: await this.recursivelyFind(widget.top),
        bottom: await this.recursivelyFind(widget.bottom),
      };
    } else {
      return { type: widget.type, data: widget.data };
    }
  }

  async createLeaf(widgetDto: WidgetDto) {
    const widget = new this.widgetModel();
    widget.type = widgetDto.type;
    widget.data = widgetDto.data;

    return await widget.save();
  }

  async recursivelyCreate(widgetDto: WidgetDto) {
    if (widgetDto.type === WidgetType.SplitVertical) {
      const widget = new this.widgetModel();
      widget.type = widgetDto.type;

      const left = await this.recursivelyCreate(widgetDto.left);
      widget.left = left.id;
      const right = await this.recursivelyCreate(widgetDto.right);
      widget.right = right.id;

      return await widget.save();
    } else if (widgetDto.type === WidgetType.SplitHorizontal) {
      const widget = new this.widgetModel();
      widget.type = widgetDto.type;

      const top = await this.recursivelyCreate(widgetDto.top);
      widget.top = top.id;
      const bottom = await this.recursivelyCreate(widgetDto.bottom);
      widget.bottom = bottom.id;

      return await widget.save();
    } else {
      return this.createLeaf(widgetDto);
    }
  }

  async deleteLeaf(name: string) {
    const widget = await this.widgetModel.findOneAndDelete({ name }).exec();

    return widget;
  }

  async recursivelyDelete(id: ObjectId) {
    const widget = await this.widgetModel.findById(id).exec();

    if (!widget) return null;

    if ((widget.type as WidgetType) === WidgetType.SplitVertical) {
      await this.recursivelyDelete(widget.left);
      await this.recursivelyDelete(widget.right);
    } else if ((widget.type as WidgetType) === WidgetType.SplitHorizontal) {
      await this.recursivelyDelete(widget.top);
      await this.recursivelyDelete(widget.bottom);
    }

    return await widget.delete();
  }
}
