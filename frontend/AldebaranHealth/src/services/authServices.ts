import api from "@/config/api";
import type { CreateUserRequest, LoginUserRequest, LoginUserResponse, UserResponse } from "@/types/auth";

async function createUser(data: CreateUserRequest): Promise<UserResponse> {
    try {
        console.log("Sign Up process for user", data);
        const signUpData = await api.post("/signup", data);

        console.log("Successfully sign up for user", signUpData.data);
        return signUpData.data;
    } catch (error: any) {
        console.error("Sign Up failed:", error?.response?.data);
        throw new Error(error?.response?.data?.message || "Failed to sign up user")
    }
}

async function loginUser(data: LoginUserRequest): Promise<LoginUserResponse> {
    try {
        console.log("Login process for user", data);
        const loginData = await api.post("/login", data);

        console.log("Successfully login for user", loginData.data);
        return loginData.data;
    } catch (error: any) {
        console.error("Login failed:", error?.response?.data);
        throw new Error(error?.response?.data?.message || "Failed to login user")
    }
}

function getJwtToken(): string | null {
    try {
        console.log("Fetching JWT Token");
        const jwtToken = localStorage.getItem("jwtToken");

        console.log("Successfully fetching jwt token");
        return jwtToken;
    } catch (error: any) {
        console.error("Error getting JWT token:", error);
        return null;
    }
}

function logout(): void {
    try {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
        console.log("Successfully logout from user");
    } catch (error: any) {
        console.error("Failed to logout from user", error);
    }
}

function isAuthenticated(): boolean {
    try {
        const jwtToken = getJwtToken();

        return jwtToken != null;
    } catch (error: any) {
        console.error("Failed to authenticate user", error);
        return false;
    }
}

export default {
    createUser,
    loginUser,
    getJwtToken,
    logout,
    isAuthenticated
}