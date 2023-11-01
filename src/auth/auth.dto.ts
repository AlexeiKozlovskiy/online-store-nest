import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}

// {
//     "id": "83b13564-9139-44da-9683-dd1f7a9cf6c6",
//     "name": "Lexa",
//     "email": "RubiRod@gmail.com",
//     "password": "123"
// }
