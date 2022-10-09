import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { CreateUserRequest, SignUpResponse } from './user';
import {
    UserWithEmailAlreadyExistsException,
    UserWithUsernameAlreadyExistsException,
} from '@modules/user/user.exception';

import { UserRepository } from '@modules/user/user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(signUpRequest: CreateUserRequest): Promise<SignUpResponse> {
        if (
            await this.userRepository.isUserExistsByEmail(signUpRequest.email)
        ) {
            throw new UserWithEmailAlreadyExistsException();
        }
        if (
            await this.userRepository.isUserExistsByUsername(
                signUpRequest.username
            )
        ) {
            throw new UserWithUsernameAlreadyExistsException();
        }
        const savedUser = await this.userRepository.saveUser(
            new User(
                signUpRequest.email,
                signUpRequest.username,
                signUpRequest.password
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
