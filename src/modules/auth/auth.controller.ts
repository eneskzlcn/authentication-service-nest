import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
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
import { InternalServerExceptionFilter } from '@filters/internal.server.exception.filter';
import { CurrentUser } from '@decorators/current-user.decorator';
import { RefreshToken } from '@decorators//refresh.token.decorator';

import { JWTUserData } from '../../entities/jwt.user';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseFilters(
        BadUserRequestExceptionFilter,
        DatabaseExceptionFilter,
        InternalServerExceptionFilter
    )
    async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
        return this.authService.login(loginRequest);
    }

    @Get('token')
    @UseGuards(JWTRefreshTokenGuard)
    @HttpCode(HttpStatus.CREATED)
    async refreshAccessTokens(
        @CurrentUser() user: JWTUserData,
        @RefreshToken() refresh_token: string
    ) {
        console.log(user);
        console.log(refresh_token);
    }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    @UseFilters(
        BadUserRequestExceptionFilter,
        DatabaseExceptionFilter,
        InternalServerExceptionFilter
    )
    async signup(@Body() signUpRequest: SignupRequest): Promise<LoginResponse> {
        return this.authService.signup(signUpRequest);
    }
}
