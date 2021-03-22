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
  @ValidateIf((profile: WidgetDto) => profile.type === WidgetType.SplitVertical)
  @IsObject()
  @ValidateNested()
  @Type(() => WidgetDto)
  left?: WidgetDto;

  @ApiProperty({ type: WidgetDto })
  @ValidateIf((profile: WidgetDto) => profile.type === WidgetType.SplitVertical)
  @IsObject()
  @ValidateNested()
  @Type(() => WidgetDto)
  right?: WidgetDto;

  @ApiProperty({ type: WidgetDto })
  @ValidateIf(
    (profile: WidgetDto) => profile.type === WidgetType.SplitHorizontal,
  )
  @IsObject()
  @ValidateNested()
  @Type(() => WidgetDto)
  top?: WidgetDto;

  @ApiProperty({ type: WidgetDto })
  @ValidateIf(
    (profile: WidgetDto) => profile.type === WidgetType.SplitHorizontal,
  )
  @IsObject()
  @ValidateNested()
  @Type(() => WidgetDto)
  bottom?: WidgetDto;

  @ApiProperty()
  @ValidateIf((profile: WidgetDto) => !isSplitWidget(profile.type))
  @IsString()
  data?: string;
}
