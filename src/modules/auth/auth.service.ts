import { Injectable } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { LoginRequest, LoginResponse } from '@modules/auth/auth.model';
import { BadUserRequestException } from '@exceptions/bad.request.exception';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        let user: any;
        try {
            user = await this.userService.getUserByUsername(username);
        } catch (e) {
            throw new BadUserRequestException('asd');
        }
        if (!user || user.password != password) {
            throw new BadUserRequestException('User not found by username');
        }
        return user;
    }

    async login(loginRequest: LoginRequest): Promise<LoginResponse> {
        const user = await this.validateUser(
            loginRequest.username,
            loginRequest.password
        );

        const accessToken = await this.generateToken(
            user.email,
            user.id,
            this.accessTokenOptions()
        );
        const refreshToken = await this.generateToken(
            user.email,
            user.id,
            this.refreshTokenOptions()
        );
        return <LoginResponse>{
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async generateToken(
        name: string,
        sub: string,
        options: JwtSignOptions
    ): Promise<string> {
        const payload = { name: name, sub: sub };
        return this.jwtService.signAsync(payload, options);
    }

    accessTokenOptions(): JwtSignOptions {
        return <JwtSignOptions>{
            expiresIn: this.configService.get('JWT_AT_EXPIRATION'),
            secret: this.configService.get('JWT_AT_SECRET'),
            algorithm: this.configService.get('JWT_AT_ALGORITHM'),
        };
    }

    refreshTokenOptions(): JwtSignOptions {
        return <JwtSignOptions>{
            expiresIn: this.configService.get('JWT_RT_EXPIRATION'),
            secret: this.configService.get('JWT_RT_SECRET'),
            algorithm: this.configService.get('JWT_RT_ALGORITHM'),
        };
    }
}
