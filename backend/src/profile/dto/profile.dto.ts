import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { WidgetDto } from 'src/widget/dto/widget.dto';

export class ProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsObject()
  @ValidateNested()
  @Type(() => WidgetDto)
  widget: WidgetDto;
}
