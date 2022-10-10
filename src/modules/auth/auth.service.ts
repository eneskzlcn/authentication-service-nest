import { Injectable } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import {
    LoginRequest,
    LoginResponse,
    SignupRequest,
} from '@modules/auth/auth.model';
import { BadUserRequestException } from '@exceptions/bad.request.exception';
import { TokenService } from '../../common/token/jwt.service';
import { HashService } from '../../common/hash/hash.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService,
        private readonly hashService: HashService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.getUserByUsername(username);

        if (!user) {
            throw new BadUserRequestException('User not found by username');
        }
        const isValidPassword = this.validatePassword(password, user.password);
        if (!isValidPassword) {
            throw new BadUserRequestException('Invalid User Password');
        }
        return user;
    }

    private async validatePassword(
        givenPassword: string,
        currentPassword: string
    ): Promise<boolean> {
        return this.hashService.compareDataWithEncryptedData(
            givenPassword,
            currentPassword
        );
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
        const user = await this.userService.create(signupRequest);
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
}
