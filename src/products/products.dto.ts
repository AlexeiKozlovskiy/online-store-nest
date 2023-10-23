import { IsString, IsInt, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  collection: number;

  @IsInt()
  @IsNotEmpty()
  stock: number;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsInt()
  @IsNotEmpty()
  size: number;

  @IsOptional()
  @IsBoolean()
  favorite: boolean;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  images: string[];
}

export class UpdateProductDTO extends CreateProductDTO {}
