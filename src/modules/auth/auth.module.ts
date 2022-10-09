import { Module } from '@nestjs/common';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleAsyncConfig } from '@config/jwt.module.config';
import { UserModule } from '@modules/user/user.module';

@Module({
    imports: [JwtModule.registerAsync(jwtModuleAsyncConfig), UserModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
