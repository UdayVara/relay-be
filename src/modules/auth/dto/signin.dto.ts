import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninUserDto {
  @ApiProperty({
    description: 'Registered user email',
    example: 'user@example.com',
    format: 'email',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    minLength: 8,
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}