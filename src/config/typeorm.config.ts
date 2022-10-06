import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5439,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA_NAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  },
};
