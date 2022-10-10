import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTStrategies } from '@strategies/jwt.strategy';
import { JWTUserData } from '../../entities/jwt.user';

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

    validate(payload: JWTUserData) {
        return payload;
    }
}
