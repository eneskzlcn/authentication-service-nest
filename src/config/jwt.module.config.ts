import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

export const jwtModuleAsyncConfig: JwtModuleAsyncOptions = {
    useFactory: async (): Promise<JwtModuleOptions> => {
        return {
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRATION },
        };
    },
};
