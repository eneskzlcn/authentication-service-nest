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

@Catch()
export class SignUpExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    let status = HttpStatus.SEE_OTHER;
    let message = 'Internal Server Error';
    console.log(exception);
    if (
      exception instanceof UserWithUsernameAlreadyExistsException ||
      exception instanceof UserWithEmailAlreadyExistsException ||
      exception instanceof NotValidSignupRequestException
    ) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }
    const responseBody = {
      status: status,
      message: message,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}
