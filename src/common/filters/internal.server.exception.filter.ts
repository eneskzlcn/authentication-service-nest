import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { logger } from '@logger/tslog.logger';
import { InternalServerException } from '@exceptions/internal.server.exception';

@Catch(InternalServerException)
export class InternalServerExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: any, host: ArgumentsHost): any {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const responseBody = {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };
        logger.error(exception.message);
        httpAdapter.reply(
            ctx.getResponse(),
            responseBody,
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
