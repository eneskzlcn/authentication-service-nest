import { AuthGuard } from '@nestjs/passport';
import { JWTStrategies } from '@strategies/jwt.strategy';

export class JWTAccessTokenGuard extends AuthGuard(JWTStrategies.ACCESS_TOKEN) {
    constructor() {
        super();
    }
}
