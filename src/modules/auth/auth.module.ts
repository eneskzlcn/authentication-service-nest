import { Module } from '@nestjs/common';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { UserModule } from '@modules/user/user.module';
import { JwtRefreshTokenStrategy } from '@strategies/jwt.rt.strategy';
import { JwtAccessTokenStrategy } from '@strategies/jwt.at.strategy';
import { TokenModule } from '../../common/token/jwt.module';

@Module({
    imports: [TokenModule, UserModule],
    controllers: [AuthController],
    providers: [AuthService, JwtRefreshTokenStrategy, JwtAccessTokenStrategy],
})
export class AuthModule {}
