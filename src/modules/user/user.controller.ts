import {
    Body,
    Controller,
    HttpStatus,
    Logger,
    Post,
    Res,
    UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { BadUserRequestExceptionFilter } from '@filters/bad.request.exception.filter';
import { DatabaseExceptionFilter } from '@filters/database.exception.filter';

import { CreateUserRequest, validateCreateUserRequest } from './user';
import { Response } from 'express';

@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(private readonly loginService: UserService) {}

    @Post('')
    @UseFilters(BadUserRequestExceptionFilter, DatabaseExceptionFilter)
    async signUp(
        @Body() createUserRequest: CreateUserRequest,
        @Res() response: Response
    ) {
        this.logger.debug(`Signup request arrived: ${createUserRequest}`);
        validateCreateUserRequest(createUserRequest);
        const signUpResponseData = await this.loginService.create(
            createUserRequest
        );
        return response.status(HttpStatus.OK).send(signUpResponseData);
    }
}
