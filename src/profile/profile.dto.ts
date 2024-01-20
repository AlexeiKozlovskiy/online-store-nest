import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @ApiProperty({ description: 'User name' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'User address' })
  address: string;

  @IsString()
  @ApiProperty({ description: 'User phone number' })
  phone: string;

  @IsString()
  @ApiProperty({ description: 'User card name' })
  nameCard: string;

  @IsString()
  @ApiProperty({ description: 'User card number' })
  numberCard: string;

  @IsString()
  @ApiProperty({ description: 'User card date' })
  dateCard: string;

  @IsString()
  @ApiProperty({ description: 'Cvv card date' })
  cvvCard: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ description: 'User id identifier' })
  userId: string | null = null;
}
