import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @MinLength(2)
  name: string;
}   