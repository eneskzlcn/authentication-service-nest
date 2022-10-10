import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
    accessTokenOptions: JwtSignOptions;
    refreshTokenOptions: JwtSignOptions;

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        this.initializeAccessTokenOptions();
        this.initializeRefreshTokenOptions();
    }

    private async generateToken(
        name: string,
        sub: string,
        options: JwtSignOptions
    ): Promise<string> {
        const payload = { name: name, sub: sub };
        return this.jwtService.signAsync(payload, options);
    }

    async generateAccessToken(name: string, sub: string) {
        return this.generateToken(name, sub, this.accessTokenOptions);
    }

    async generateRefreshToken(name: string, sub: string) {
        return this.generateToken(name, sub, this.refreshTokenOptions);
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
