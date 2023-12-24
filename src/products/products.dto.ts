import { IsString, IsInt, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product name' })
  name: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product price' })
  price: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'What year`s collection' })
  collection: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'Quantity product in stock', minimum: 1 })
  stock: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product color' })
  color: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product size' })
  size: number;

  @IsBoolean()
  @ApiProperty({ description: 'Product is favorite', required: false })
  @IsOptional()
  favorite: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Product category' })
  category: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Array images of product' })
  images: string[];
}

export class UpdateProductDto extends CreateProductDto {}
