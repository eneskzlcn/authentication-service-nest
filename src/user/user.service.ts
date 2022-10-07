import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpRequest, SignUpResponse } from './user';
import {
  UserWithEmailAlreadyExistsException,
  UserWithUsernameAlreadyExistsException,
} from './exception/user.exception';
import { Logger } from '@nestjs/common';
import { DatabaseException } from '../common/exception/database/exception';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async signUp(signUpRequest: SignUpRequest): Promise<SignUpResponse> {
    if (await this.isUserExistsByEmail(signUpRequest.email)) {
      this.logger.debug(
        `User already exist with email: ${signUpRequest.email}`,
      );
      throw new UserWithEmailAlreadyExistsException();
    }
    if (await this.isUserExistsByUsername(signUpRequest.username)) {
      this.logger.debug(
        `User already exist with username: ${signUpRequest.username}`,
      );
      throw new UserWithUsernameAlreadyExistsException();
    }
    const savedUser = await this.userRepository
      .save(new User(signUpRequest.email, signUpRequest.username))
      .catch((error) => {
        this.logger.error(
          `Error occurred when saving the user to the database : ${error.message}`,
        );
        throw new DatabaseException(error.message);
      });
    return {
      username: savedUser.username,
      id: savedUser.id,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
    } as SignUpResponse;
  }
  signIn(): string {
    return 'Hello World';
  }
  async isUserExistsByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository
      .findOne({
        where: { email: email },
      })
      .catch((error) => {
        this.logger.error(
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
        this.logger.error(
          `Error occurred when checking is user exists by username ${error.username}`,
        );
        throw new DatabaseException(error.message);
      });
    return !!user;
  }
}
