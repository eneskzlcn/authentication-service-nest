import { Injectable } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import {
    LoginRequest,
    LoginResponse,
    SignupRequest,
} from '@modules/auth/auth.model';
import { BadUserRequestException } from '@exceptions/bad.request.exception';
import { TokenService } from '../../common/token/jwt.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
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

        const accessToken = await this.tokenService.generateAccessToken(
            user.email,
            user.id
        );
        const refreshToken = await this.tokenService.generateRefreshToken(
            user.email,
            user.id
        );
        return <LoginResponse>{
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async signup(signupRequest: SignupRequest): Promise<LoginResponse> {
        return {} as LoginResponse;
    }
}
