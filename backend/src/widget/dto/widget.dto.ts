import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { WidgetType } from '../widget-type.enum';
import { isSplitWidget } from '../widget.utils';

export class WidgetDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(WidgetType)
  type: WidgetType;

  @ValidateIf((profile: WidgetDto) => isSplitWidget(profile.type))
  @IsObject()
  @ValidateNested()
  @Type(() => WidgetDto)
  left?: WidgetDto;

  @ValidateIf((profile: WidgetDto) => isSplitWidget(profile.type))
  @IsObject()
  @ValidateNested()
  @Type(() => WidgetDto)
  right?: WidgetDto;

  @ValidateIf((profile: WidgetDto) => !isSplitWidget(profile.type))
  @IsString()
  data?: string;
}
