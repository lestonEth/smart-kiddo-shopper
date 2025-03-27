import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

interface PrivateRouteProps {
    allowedRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles = [] }) => {
    const { user, isAuthenticated } = useAuth();

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If roles are specified and user's role is not in the allowed roles
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role || "")) {
        // Redirect based on user role
        if (user?.role === "parent") {
            return <Navigate to="/dashboard" replace />;
        } else if (user?.role === "child") {
            return <Navigate to="/child-dashboard" replace />;
        } else {
            return <Navigate to="/restricted" replace />;
        }
    }

    // User is authenticated and authorized for this route
    return <Outlet />;
};

export default PrivateRoute;