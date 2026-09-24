import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    format: 'email',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the new account',
    example: 'password123',
    minLength: 8,
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    minLength: 2,
    required: true,
  })
  @IsString()
  @MinLength(2)
  name: string;
}