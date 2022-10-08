import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpRequest, SignUpResponse } from './user';
import {
  UserWithEmailAlreadyExistsException,
  UserWithUsernameAlreadyExistsException,
} from './user.exception';
import { logger } from '@logger/tslog.logger';

import { DatabaseException } from '@exceptions/database.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async signUp(signUpRequest: SignUpRequest): Promise<SignUpResponse> {
    if (await this.isUserExistsByEmail(signUpRequest.email)) {
      throw new UserWithEmailAlreadyExistsException();
    }
    if (await this.isUserExistsByUsername(signUpRequest.username)) {
      throw new UserWithUsernameAlreadyExistsException();
    }
    const savedUser = await this.saveUser(
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
  async saveUser(user: User): Promise<User> {
    let savedUser = <User>{};
    try {
      savedUser = await this.userRepository.save(user);
    } catch (error) {
      throw new DatabaseException(error.message);
    }
    return savedUser;
  }
  async isUserExistsByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository
      .findOne({
        where: { email: email },
      })
      .catch((error) => {
        logger.error(
          `Error occurred when checking is user exists in database with email ${error.message}`,
        );
        throw new DatabaseException(error.message);
      });
    return !!user;
  }
  async isUserExistsByUsername(username: string): Promise<boolean> {
    const user = await this.userRepository
      .findOne({
        where: { username: username },
      })
      .catch((error) => {
        logger.error(
          `Error occurred when checking is user exists by username ${error.username}`,
        );
        throw new DatabaseException(error.message);
      });
    return !!user;
  }
}
