import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isValidSignUpRequest, SignUpRequest } from './user';

@Controller('')
export class UserController {
  constructor(private readonly loginService: UserService) {}
  @Post('/signup')
  signUp(@Body() signUpRequest: SignUpRequest) {
    if (!isValidSignUpRequest(signUpRequest)) {
      return new HttpException('', HttpStatus.BAD_REQUEST);
    }
    this.loginService.signUp(signUpRequest);
    return '';
  }
  @Post('/signin')
  signIn(@Body() signInRequest: string): string {
    return signInRequest;
  }
}
