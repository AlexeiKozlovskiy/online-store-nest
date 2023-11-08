import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class CreateGoogleUserDto {
  @IsString()
  login: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  picture: string;

  @IsBoolean()
  isGoogle: boolean;
}
