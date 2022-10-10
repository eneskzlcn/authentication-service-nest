import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import {
    CreateUserRequest,
    SignUpResponse,
    validateCreateUserRequest,
} from './user';
import {
    UserWithEmailAlreadyExistsException,
    UserWithUsernameAlreadyExistsException,
} from '@modules/user/user.exception';

import { UserRepository } from '@modules/user/user.repository';
import { HashService } from '../../common/hash/hash.service';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashService: HashService
    ) {}

    async create(
        createUserRequest: CreateUserRequest
    ): Promise<SignUpResponse> {
        validateCreateUserRequest(createUserRequest);
        if (
            await this.userRepository.isUserExistsByEmail(
                createUserRequest.email
            )
        ) {
            throw new UserWithEmailAlreadyExistsException();
        }
        if (
            await this.userRepository.isUserExistsByUsername(
                createUserRequest.username
            )
        ) {
            throw new UserWithUsernameAlreadyExistsException();
        }
        const encryptedPassword = await this.hashService.encrypt(
            createUserRequest.password
        );
        const savedUser = await this.userRepository.saveUser(
            new User(
                createUserRequest.email,
                createUserRequest.username,
                encryptedPassword
            )
        );
        return <SignUpResponse>{
            username: savedUser.username,
            id: savedUser.id,
            email: savedUser.email,
            createdAt: savedUser.createdAt,
        };
    }

    async getUserByUsername(username: string): Promise<User> {
        return this.userRepository.getUserByUsername(username);
    }
}
