import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserRepository } from '@modules/user/user.repository';
import { HashModule } from '../../common/hash/hash.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), HashModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserService],
})
export class UserModule {}
