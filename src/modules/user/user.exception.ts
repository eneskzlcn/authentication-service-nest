import { HttpException, HttpStatus } from '@nestjs/common';

export class UserWithEmailAlreadyExistsException extends Error {
  constructor() {
    super('User with email already exists.');
  }
}

export class UserWithUsernameAlreadyExistsException extends Error {
  constructor() {
    super('User with username already exists');
  }
}
export class NotValidSignupRequestException extends HttpException {
  constructor() {
    super('Not valid signup request', HttpStatus.BAD_REQUEST);
  }
}
