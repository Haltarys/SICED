import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEnum(WidgetType)
  type: WidgetType;

  @ApiProperty({ type: WidgetDto })
  @ValidateIf((profile: WidgetDto) => isSplitWidget(profile.type))
  @IsObject()
  @ValidateNested()
  @Type(() => WidgetDto)
  left?: WidgetDto;

  @ApiProperty({ type: WidgetDto })
  @ValidateIf((profile: WidgetDto) => isSplitWidget(profile.type))
  @IsObject()
  @ValidateNested()
  @Type(() => WidgetDto)
  right?: WidgetDto;

  @ApiProperty()
  @ValidateIf((profile: WidgetDto) => !isSplitWidget(profile.type))
  @IsString()
  data?: string;
}
