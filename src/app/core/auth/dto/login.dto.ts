export interface LoginDto {
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;

    user: {
        id: string;
        name: string;
        email: string;
    }
}
