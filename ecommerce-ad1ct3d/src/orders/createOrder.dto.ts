import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { PartialProductDto } from '../products/products.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PartialProductDto)
  @ApiProperty()
  products: PartialProductDto[];
}
