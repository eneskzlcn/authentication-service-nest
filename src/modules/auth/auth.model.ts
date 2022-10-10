export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

export interface SignupRequest {
    email: string;
    username: string;
    password: string;
}
