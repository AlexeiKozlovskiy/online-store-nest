import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginGoogleDto {
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
