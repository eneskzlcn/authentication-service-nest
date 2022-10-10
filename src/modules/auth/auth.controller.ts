import {
    Body,
    Controller,
    Get,
    Post,
    UseFilters,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    LoginRequest,
    LoginResponse,
    SignupRequest,
} from '@modules/auth/auth.model';
import { BadUserRequestExceptionFilter } from '@filters/bad.request.exception.filter';
import { DatabaseExceptionFilter } from '@filters/database.exception.filter';
import { JWTRefreshTokenGuard } from '@guards/jwt.rt.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @UseFilters(BadUserRequestExceptionFilter, DatabaseExceptionFilter)
    async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
        return this.authService.login(loginRequest);
    }

    @Get('/token')
    @UseGuards(JWTRefreshTokenGuard)
    async refreshAccessTokens() {
        console.log('hey');
    }

    @Post('signup')
    @UseFilters(BadUserRequestExceptionFilter, DatabaseExceptionFilter)
    async signup(@Body() signUpRequest: SignupRequest): Promise<LoginResponse> {
        return this.authService.signup(signUpRequest);
    }
}
