export interface DataStoreInToken {
    sub: string;
    exp: number;
    name: string;
    scope: string[];
}

export interface TokenData {
    token: string;
    expiresIn: number;
}

export interface User {
    username: string;
    email: string;
    password: string;
}
