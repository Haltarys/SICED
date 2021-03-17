import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { WidgetDto } from 'src/widget/dto/widget.dto';

export class ProfileDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => WidgetDto)
  widget: WidgetDto;
}
