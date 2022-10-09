import { BadUserRequestException } from '@exceptions/bad.request.exception';

export class UserWithEmailAlreadyExistsException extends BadUserRequestException {
    constructor() {
        super('User with email already exists.');
    }
}

export class UserWithUsernameAlreadyExistsException extends BadUserRequestException {
    constructor() {
        super('User with username already exists');
    }
}

export class NotValidSignupRequestException extends BadUserRequestException {
    constructor() {
        super('Not valid signup request');
    }
}
