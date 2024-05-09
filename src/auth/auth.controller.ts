import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/Dtos/LoginUser.dto';
import { CreateUserDto } from 'src/Dtos/CreateUser.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('signin')
  signIn(@Body() credential: LoginUserDto) {
    return this.authService.signIn(credential)
  }

  @Post('signup')
  @UsePipes(new ValidationPipe({transform:true}))
  signUp(@Body() user:CreateUserDto){
    return this.authService.signUp(user)
  }
}

