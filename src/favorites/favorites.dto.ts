import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateFavoritesDto {
  @IsString()
  favorite: string;

  @IsOptional()
  @IsUUID()
  userId: string | null = null;
}
