import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsString()
  nameCard: string;

  @IsString()
  numberCard: string;

  @IsString()
  dateCard: string;

  @IsString()
  cvvCard: string;

  @IsOptional()
  @IsUUID()
  userId: string | null = null;
}

export class UpdateProfileDto extends CreateProfileDto {}
