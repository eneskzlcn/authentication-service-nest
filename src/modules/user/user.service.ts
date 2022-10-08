import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { SignUpRequest, SignUpResponse } from './user';
import {
  UserWithEmailAlreadyExistsException,
  UserWithUsernameAlreadyExistsException,
} from './user.exception';

import { UserRepository } from '@modules/user/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async signUp(signUpRequest: SignUpRequest): Promise<SignUpResponse> {
    if (await this.userRepository.isUserExistsByEmail(signUpRequest.email)) {
      throw new UserWithEmailAlreadyExistsException();
    }
    if (
      await this.userRepository.isUserExistsByUsername(signUpRequest.username)
    ) {
      throw new UserWithUsernameAlreadyExistsException();
    }
    const savedUser = await this.userRepository.saveUser(
      new User(signUpRequest.email, signUpRequest.password),
    );
    return <SignUpResponse>{
      username: savedUser.username,
      id: savedUser.id,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
    };
  }
  signIn(): string {
    return 'Hello World';
  }
}
