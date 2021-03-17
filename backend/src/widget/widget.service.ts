import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { WidgetDto } from './dto/widget.dto';
import { WidgetType } from './widget-type.enum';
import { Widget, WidgetDocument } from './widget.schema';
import { isSplitWidget } from './widget.utils';

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

    if (isSplitWidget(widget.type as WidgetType)) {
      return {
        type: widget.type,
        left: await this.recursivelyFind(widget.left),
        right: await this.recursivelyFind(widget.right),
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
    if (isSplitWidget(widgetDto.type)) {
      const widget = new this.widgetModel();
      widget.type = widgetDto.type;

      const left = await this.recursivelyCreate(widgetDto.left);
      widget.left = left.id;
      const right = await this.recursivelyCreate(widgetDto.right);
      widget.right = right.id;

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

    if (isSplitWidget(widget.type as WidgetType)) {
      await this.recursivelyDelete(widget.left);
      await this.recursivelyDelete(widget.right);
    }
    return await widget.delete();
  }
}
