import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Logger,
    Post,
    UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { BadUserRequestExceptionFilter } from '@filters/bad.request.exception.filter';
import { DatabaseExceptionFilter } from '@filters/database.exception.filter';

import { CreateUserRequest, validateCreateUserRequest } from './user';

@Controller('user')
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(private readonly loginService: UserService) {}

    @Post('')
    @UseFilters(BadUserRequestExceptionFilter, DatabaseExceptionFilter)
    @HttpCode(HttpStatus.OK)
    async create(@Body() createUserRequest: CreateUserRequest) {
        this.logger.debug(`Signup request arrived: ${createUserRequest}`);
        validateCreateUserRequest(createUserRequest);
        return await this.loginService.create(createUserRequest);
    }
}
