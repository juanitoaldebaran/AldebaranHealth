import type { AuthContextType, CreateUserRequest, LoginUserRequest, LoginUserResponse, UserResponse } from "@/types/auth";
import { useEffect, useState } from "react"
import authServices from "@/services/authServices";

const useAuth = (): AuthContextType => {
    const [user, setUser] = useState<UserResponse | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //Server side rendering for authentication
    useEffect(() => {
        const jwtToken = authServices.getJwtToken();
        const storedUser = localStorage.getItem("user");

        setIsLoading(true);

        if (jwtToken && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser) as UserResponse;
                setIsAuthenticated(true);
                setUser(parsedUser as UserResponse);
            } catch (error: any) {
                console.error(error);
                setIsAuthenticated(false);
                setUser(null);
            } finally {
                setIsLoading(false);
        }
        }

    }, []);

    const login = async (data: LoginUserRequest): Promise<LoginUserResponse> => {
        try {
            const loginUserData = await authServices.loginUser(data);

            if (loginUserData.jwtToken) {
                localStorage.setItem("jwtToken", loginUserData.jwtToken);
            }

            if (loginUserData.userResponse) {
                setIsAuthenticated(true);
                setUser(loginUserData.userResponse);
                localStorage.setItem("user", JSON.stringify(loginUserData.userResponse));
            }

            console.log("Successfully login user ✅");

            return loginUserData;

        } catch (error: any) {
            setIsAuthenticated(false);
            setUser(null);
            throw new error;
        }
    }

    const signup = async (data: CreateUserRequest): Promise<UserResponse> => {
        try {
            const signUpUserData = await authServices.createUser(data);

            setUser(signUpUserData);
            console.log("Successfully sign up user ✅");

            return signUpUserData;
        } catch (error: any) {
            throw new error;
        }
    }

    const logout = (): void => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setUser(null);
    }

    const getJwtToken = (): string | null => {
        try {
            const data = localStorage.getItem("jwtToken");

            return data;
        } catch (error: any) {
            throw new error;
        }
    }

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        getJwtToken
    }
}

export default useAuth;