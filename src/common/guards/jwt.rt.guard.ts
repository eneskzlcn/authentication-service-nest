import { AuthGuard } from '@nestjs/passport';
import { JWTStrategies } from '@strategies/jwt.strategy';

export class JWTRefreshTokenGuard extends AuthGuard(
    JWTStrategies.REFRESH_TOKEN
) {
    constructor() {
        super();
    }
}
