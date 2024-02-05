import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class FavoritesDto {
  @IsString()
  @ApiProperty({ description: 'Product id' })
  favorite: string;

  @IsOptional()
  @IsUUID()
  userId: string | null = null;
}
