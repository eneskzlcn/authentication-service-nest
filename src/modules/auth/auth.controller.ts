import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse } from '@modules/auth/auth.model';
import { BadUserRequestExceptionFilter } from '@filters/bad.request.exception.filter';
import { DatabaseExceptionFilter } from '@filters/database.exception.filter';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseFilters(BadUserRequestExceptionFilter, DatabaseExceptionFilter)
    async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
        return this.authService.login(loginRequest);
    }
}
