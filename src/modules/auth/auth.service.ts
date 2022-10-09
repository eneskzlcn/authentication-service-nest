import { Injectable } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest, LoginResponse } from '@modules/auth/auth.model';
import { BadUserRequestException } from '@exceptions/bad.request.exception';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
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

        const payload = { name: user.username, sub: user.id };
        return <LoginResponse>{
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
