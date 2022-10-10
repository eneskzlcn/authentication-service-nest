import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenService } from './jwt.service';

@Module({
    imports: [JwtModule],
    providers: [JwtService, TokenService],
    exports: [TokenService],
})
export class TokenModule {}
