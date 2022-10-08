import {
  Body,
  Controller,
  Logger,
  Post,
  UseFilters,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpUserRelatedExceptionFilter } from './user.filter';
import { DatabaseExceptionFilter } from '@filters/database.exception.filter';

import { validateSignupRequest, SignUpRequest } from './user';
import { Response } from 'express';

@Controller('')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly loginService: UserService) {}

  @Post('/signup')
  @UseFilters(SignUpUserRelatedExceptionFilter, DatabaseExceptionFilter)
  async signUp(
    @Body() signUpRequest: SignUpRequest,
    @Res() response: Response,
  ) {
    this.logger.debug(`Signup request arrived: ${signUpRequest}`);
    validateSignupRequest(signUpRequest);
    const signUpResponseData = await this.loginService.signUp(signUpRequest);
    return response.status(HttpStatus.OK).send(signUpResponseData);
  }

  @Post('/signin')
  signIn(@Body() signInRequest: string): string {
    return signInRequest;
  }
}
