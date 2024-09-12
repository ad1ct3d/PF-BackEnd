import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsUUID,
  isUUID,
} from 'class-validator';
import { Category } from '../Categories/categories.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from '../Categories/categories.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'Bread' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ default: 'A piece of bread' })
  description: string;

  @ApiProperty({ default: 100 })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  stock: boolean;

  @IsString()
  @IsOptional()
  imgUrl?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Product image file',
    required: false,
  })
  @IsOptional()
  file: any;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ type: () => CategoryDto, required: false })
  categoryId?: string;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ required: false })
  orderDetailId?: string;
}

export class PartialProductDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  stock: boolean;
}

export class UpdateProductDto {
  id?: string;

  @ApiProperty({ default: '' })
  name?: string;

  @ApiProperty({ default: '' })
  description?: string;

  @ApiProperty({ default: '' })
  price?: number;

  @ApiProperty({ default: '' })
  stock?: boolean;

  @ApiProperty({ default: '' })
  imgUrl?: string;
}
