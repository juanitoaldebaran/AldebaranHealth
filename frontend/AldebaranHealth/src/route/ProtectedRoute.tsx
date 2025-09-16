import LoadingSpinner from "@/components/LoadingSpinner";
import { useAuthContext } from "@/context/AuthContext";
import { Navigate, useLocation, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
    redirectPath?: string;
}

const ProtectedRoute = ({redirectPath = "/login"}: ProtectedRouteProps) => {
    const {isAuthenticated, isLoading} = useAuthContext();
    const location = useLocation();

    {isLoading && (
        <LoadingSpinner></LoadingSpinner>
    )}

    if (!isAuthenticated) {
        return <Navigate to={redirectPath} state={{fromPath: location}}></Navigate>
    }

    return <Outlet />
}

export default ProtectedRoute;