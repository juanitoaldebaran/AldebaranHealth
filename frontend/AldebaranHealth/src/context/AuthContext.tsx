import { createContext, useContext } from "react";
import type { AuthContextType } from "@/types/auth";
import useAuth from "@/hooks/useAuth";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const auth = useAuth();

    return (
       <AuthContext.Provider value={auth}>
        {children}
       </AuthContext.Provider>
    )
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider");
    }

    return context;
}
