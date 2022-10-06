import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { SignUpRequest, SignUpResponse } from './user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async signUp(signUpRequest: SignUpRequest): Promise<SignUpResponse | Error> {
    if (await this.isUserExistsByEmail(signUpRequest.email)) {
      return UserWithEmailAlreadyExistsError;
    }
    if (await this.isUserExistsByUsername(signUpRequest.username)) {
      return UserWithUsernameAlreadyExistsError;
    }
    const savedUser = await this.userRepository.save(
      new User(signUpRequest.email, signUpRequest.username),
    );
    if (savedUser == null) {
    }
  }
  signIn(): string {
    return 'Hello World';
  }
  async isUserExistsByEmail(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: email },
      lock: { mode: 'optimistic', version: 1 },
    });
    return user ? true : false;
  }
  async isUserExistsByUsername(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { username: username },
      lock: { mode: 'optimistic', version: 1 },
    });
    return user ? true : false;
  }
}
