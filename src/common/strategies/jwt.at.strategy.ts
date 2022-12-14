import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTStrategies } from '@strategies/jwt.strategy';
import { JWTUserData } from '../../entities/jwt.user';
import { logger } from '@logger/tslog.logger';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
    Strategy,
    JWTStrategies.ACCESS_TOKEN
) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_AT_SECRET'),
            passReqToCallback: true,
        });
    }

    validate(payload: any): JWTUserData {
        const userData: JWTUserData = {
            email: payload.email,
            sub: payload.sub,
        };
        logger.debug(userData);
        return userData;
    }
}
