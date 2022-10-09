import { Module } from '@nestjs/common';
import { AuthController } from '@modules/auth/auth.controller';
import { AuthService } from '@modules/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@modules/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [JwtModule, UserModule, ConfigModule.forRoot()],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
