import type { Conversation } from "./conversation";

export interface User {
    userId: number;
    userName: string;
    email: string;
    password: string;
    createdAt: string;
    conversationList: Conversation[];
}

export interface LoginUserRequest {
    email: string;
    password: string;
}

export interface LoginUserResponse {
    jwtToken: string;
    expiresAt: string;
    userResponse: UserResponse | null;
}

export interface CreateUserRequest {
    userName: string;
    email: string;
    password: string;
}

export interface UserResponse {
    userName: string;
    email: string;
    createdAt: string;
}

export interface AuthContextType {
    user: UserResponse | null;
    login: (data: LoginUserRequest) => Promise<LoginUserResponse>;
    signup: (data: CreateUserRequest) => Promise<UserResponse>;
    getJwtToken: () => string | null;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}