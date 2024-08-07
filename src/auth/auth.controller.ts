import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('register')
    register(@Body() user: RegisterAuthDto) //http://localhost:3000/auth/register => POST
    {
        return this.authService.register(user);
    }

    @Post('login')
    login(@Body() loginData: LoginAuthDto) //http://localhost:3000/auth/login => POST
    {
        return this.authService.login(loginData);
    }

}
