import { NotValidSignupRequestException } from './exception/user.exception';
import { Logger } from '@nestjs/common';

export interface SignUpRequest {
  email: string;
  username: string;
  password: string;
}

export interface SignUpResponse {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

export function validateSignupRequest(logger: Logger, request: SignUpRequest) {
  if (
    !isValidEmail(request.email) ||
    !isValidPassword(request.password) ||
    !isValidUsername(request.username)
  ) {
    logger.error(`Not valid signup request: ${request}`);
    throw new NotValidSignupRequestException();
  }
}

const emailRegExp = /\S+@\S+\.\S+/;
const passwordRegExp = /^[a-zA-Z0-9]{4,20}$/;
const usernameRegExp = /^[a-zA-Z0-9]{6,20}$/;

export function isValidEmail(email: string): boolean {
  if (!email) {
    return false;
  }
  return emailRegExp.test(email);
}

export function isValidUsername(username: string): boolean {
  if (!username) {
    return false;
  }
  return usernameRegExp.test(username);
}

export function isValidPassword(password: string): boolean {
  if (!password) {
    return false;
  }
  return passwordRegExp.test(password);
}
