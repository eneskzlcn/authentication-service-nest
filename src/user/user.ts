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
export function isValidSignUpRequest(request: SignUpRequest): boolean {
  if (!isValidEmail(request.email)) return false;
  if (!isValidPassword(request.password)) return false;
  return isValidUsername(request.username);
}

const emailRegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const passwordRegExp = /\w{4,20}/;
const usernameRegExp = /\w{6,20}/;

function isValidEmail(email: string): boolean {
  return emailRegExp.test(email);
}
function isValidUsername(username: string): boolean {
  return usernameRegExp.test(username);
}
function isValidPassword(password: string): boolean {
  return passwordRegExp.test(password);
}
