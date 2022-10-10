import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWTUserData } from '../../entities/jwt.user';

@Injectable()
export class TokenService {
    private accessTokenOptions: JwtSignOptions;
    private refreshTokenOptions: JwtSignOptions;

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.initializeAccessTokenOptions();
        this.initializeRefreshTokenOptions();
    }

    private async generateToken(
        email: string,
        sub: string,
        options: JwtSignOptions
    ): Promise<string> {
        const payload: JWTUserData = { email: email, sub: sub };
        return this.jwtService.signAsync(payload, options);
    }

    async generateAccessToken(email: string, sub: string) {
        return this.generateToken(email, sub, this.accessTokenOptions);
    }

    async generateRefreshToken(email: string, sub: string) {
        return this.generateToken(email, sub, this.refreshTokenOptions);
    }

    initializeAccessTokenOptions(): void {
        this.accessTokenOptions = <JwtSignOptions>{
            expiresIn: this.configService.get('JWT_AT_EXPIRATION'),
            secret: this.configService.get('JWT_AT_SECRET'),
            algorithm: this.configService.get('JWT_AT_ALGORITHM'),
        };
    }

    initializeRefreshTokenOptions(): void {
        this.refreshTokenOptions = <JwtSignOptions>{
            expiresIn: this.configService.get('JWT_RT_EXPIRATION'),
            secret: this.configService.get('JWT_RT_SECRET'),
            algorithm: this.configService.get('JWT_RT_ALGORITHM'),
        };
    }
}
