import { Body, Controller, Logger, Post, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpExceptionFilter } from './exception/user.filter';

import { validateSignupRequest, SignUpRequest, SignUpResponse } from './user';

@Controller('')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly loginService: UserService) {}

  @Post('/signup')
  @UseFilters(SignUpExceptionFilter)
  async signUp(@Body() signUpRequest: SignUpRequest): Promise<SignUpResponse> {
    this.logger.debug(`Signup request arrived: ${signUpRequest}`);
    validateSignupRequest(signUpRequest);
    return this.loginService.signUp(signUpRequest);
  }

  @Post('/signin')
  signIn(@Body() signInRequest: string): string {
    return signInRequest;
  }
}
