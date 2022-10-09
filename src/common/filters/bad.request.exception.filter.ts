import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BadUserRequestException } from '@exceptions/bad.request.exception';

@Catch(BadUserRequestException)
export class BadUserRequestExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: HttpException, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const responseBody = {
            status: exception.getStatus(),
            message: exception.message,
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };
        httpAdapter.reply(
            ctx.getResponse(),
            responseBody,
            exception.getStatus()
        );
    }
}
