import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTStrategies } from './jwt.strategy';
import { JWTUserData } from '../../entities/jwt.user';
import { logger } from '@logger/tslog.logger';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
    Strategy,
    JWTStrategies.REFRESH_TOKEN
) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_RT_SECRET'),
        });
    }

    async validate(payload: any): Promise<JWTUserData> {
        const userData: JWTUserData = {
            email: payload.email,
            sub: payload.sub,
        };
        logger.debug(payload.id);
        return userData;
    }
}
