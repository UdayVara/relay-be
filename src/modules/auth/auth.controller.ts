import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiOkResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup.dto';
import { SigninUserDto } from './dto/signin.dto';

@ApiTags('Auth')
@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    description: 'Signup payload',
    type: SignupUserDto,
    schema: {
      example: {
        email: 'user@example.com',
        password: 'password123',
        name: 'John Doe',
      },
    },
  })
  @ApiCreatedResponse({
    description: 'User created successfully',
    schema: {
      example: {
        message: 'User Signup successfully',
        user: { id: 1, email: 'user@example.com', name: 'John Doe' },
        token: 'jwt-token',
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Validation failed or bad request' })
  @ApiConflictResponse({ description: 'User already exists' })
  async signup(@Body() body: SignupUserDto) {
    return this.authService.SignupService(body);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate a user and return a JWT' })
  @ApiBody({
    description: 'Signin payload',
    type: SigninUserDto,
    schema: {
      example: { email: 'user@example.com', password: 'password123' },
    },
  })
  @ApiOkResponse({
    description: 'User signed in successfully',
    schema: {
      example: {
        message: 'User Signin successfully',
        user: { id: 1, email: 'user@example.com', name: 'John Doe' },
        token: 'jwt-token',
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  async signin(@Body() body: SigninUserDto) {
    return this.authService.SigninService(body);
  }
}
