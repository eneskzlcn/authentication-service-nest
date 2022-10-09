import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { DatabaseException } from '@exceptions/database.exception';
import { logger } from '@logger/tslog.logger';

@Injectable()
export class UserRepository {
    constructor(@InjectRepository(User) private repository: Repository<User>) {}

    async saveUser(user: User): Promise<User> {
        let savedUser = <User>{};
        try {
            savedUser = await this.repository.save(user);
        } catch (error) {
            throw new DatabaseException(error.message);
        }
        logger.debug(`Successfully created user with ID: ${savedUser.id}`);
        return savedUser;
    }

    async isUserExistsByEmail(email: string): Promise<boolean> {
        const user = await this.repository
            .findOne({
                where: { email: email },
            })
            .catch((error) => {
                throw new DatabaseException(error.message);
            });
        return !!user;
    }

    async isUserExistsByUsername(username: string): Promise<boolean> {
        const user = await this.repository
            .findOne({
                where: { username: username },
            })
            .catch((error) => {
                throw new DatabaseException(error.message);
            });
        return !!user;
    }

    async getUserByUsername(username: string): Promise<User> {
        return await this.repository
            .findOne({
                where: { username: username },
            })
            .catch((error) => {
                throw new DatabaseException(error.message);
            });
    }
}
