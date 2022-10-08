import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  NotValidSignupRequestException,
  UserWithEmailAlreadyExistsException,
  UserWithUsernameAlreadyExistsException,
} from './user.exception';

@Catch(
  UserWithEmailAlreadyExistsException,
  UserWithUsernameAlreadyExistsException,
  NotValidSignupRequestException,
)
export class SignUpUserRelatedExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const responseBody = {
      status: HttpStatus.BAD_REQUEST,
      message: exception.message,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, HttpStatus.BAD_REQUEST);
  }
}
