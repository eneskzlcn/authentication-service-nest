import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTStrategies } from './jwt.strategy';
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
            passReqToCallback: true,
        });
    }

    validate(payload: any) {
        logger.info(payload);
        return payload;
    }
}
