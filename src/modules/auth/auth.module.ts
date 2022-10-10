import { Module } from '@nestjs/common';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { UserModule } from '@modules/user/user.module';
import { JwtRefreshTokenStrategy } from '@strategies/jwt.rt.strategy';
import { JwtAccessTokenStrategy } from '@strategies/jwt.at.strategy';
import { TokenModule } from '../../common/token/jwt.module';
import { HashModule } from '../../common/hash/hash.module';

@Module({
    imports: [TokenModule, UserModule, HashModule],
    controllers: [AuthController],
    providers: [AuthService, JwtRefreshTokenStrategy, JwtAccessTokenStrategy],
})
export class AuthModule {}
