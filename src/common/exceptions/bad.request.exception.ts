import { HttpException, HttpStatus } from '@nestjs/common';

export class BadUserRequestException extends HttpException {
    constructor(message) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}
