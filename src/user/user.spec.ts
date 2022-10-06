import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
  SignUpRequest,
  validateSignupRequest,
} from './user';
import { NotValidSignupRequestException } from './exception/user.exception';

describe('Email Validation', () => {
  test('given falsy email then it should return false when isValidEmail called', () => {
    const givenEmails = [undefined, null, ''];
    givenEmails.forEach((email) => {
      expect(isValidEmail(email)).toBeFalsy();
    });
  });
  test('given not empty but not valid email then it should return false when isValidEmail called', () => {
    const givenEmails = ['a', 'asd@', 'a@.c', 'aasd@asdasd@'];
    givenEmails.forEach((email) => {
      expect(isValidEmail(email)).toBeFalsy();
    });
  });
  test('given valid email then it should return true when isValidEmail called', () => {
    const givenEmails: string[] = [
      'asd@gmail.com',
      'a@g.c',
      '1asf@m.csda',
      'asd__123@dg.csad',
    ];
    givenEmails.forEach((email) => {
      expect(isValidEmail(email)).toBeTruthy();
    });
  });
});

describe('Username Validation', () => {
  const givenInvalidUsernames = [
    undefined,
    null,
    'a'.repeat(1),
    'a'.repeat(4),
    'a'.repeat(32),
    'abdcd123'.repeat(5),
    ',-+',
    '',
  ];
  const givenValidUsernames = ['asdfssd', '123ascz', 'asdsafasf', 'xzcz313'];
  test('given invalid usernames then it should return false when isValidUsername called ', () => {
    givenInvalidUsernames.forEach((username) => {
      expect(isValidUsername(username)).toBeFalsy();
    });
  });
  test('given valid usernames then it should return true when isValidUsername called', () => {
    givenValidUsernames.forEach((username) => {
      expect(isValidUsername(username)).toBeTruthy();
    });
  });
});
describe('Password Validation', () => {
  const givenInvalidPasswords = [
    undefined,
    null,
    '',
    'asd',
    '--,czx',
    'azx',
    'AS'.repeat(20),
    'zz33'.repeat(6),
  ];
  const givenValidPasswords = ['asvxv12e', 'zczxv123', 'asafa', 'a'.repeat(20)];
  test('given invalid password then it should return false when isValidPassword called', () => {
    givenInvalidPasswords.forEach((password) => {
      expect(isValidPassword(password)).toBeFalsy();
    });
  });
  test('given valid password then it should return true when isValidPassword called', () => {
    givenValidPasswords.forEach((password) => {
      expect(isValidPassword(password)).toBeTruthy();
    });
  });
});

describe('Validate Signup Request', () => {
  test('given valid signup request then it should not throw exception when validateSignupRequest called', () => {
    const givenSignupRequest: SignUpRequest = {
      email: 'asdsaf@gmail.com',
      password: 'asdasd',
      username: 'asdasdad',
    };
    try {
      validateSignupRequest(givenSignupRequest);
    } catch (e: any) {
      expect(e).toBeFalsy();
    }
  });
  test('given invalid signup request then it should throw NotValidSignupRequestException when validateSignupRequest called', () => {
    const givenSignupRequest: SignUpRequest = {
      email: '.',
      password: 'asdasd',
      username: 'asdasdad',
    };
    try {
      validateSignupRequest(givenSignupRequest);
    } catch (e: any) {
      expect(e).toBeTruthy();
      expect(e).toBeInstanceOf(NotValidSignupRequestException);
    }
  });
});
