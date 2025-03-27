import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RestrictedRoute: React.FC = () => {
    const { user } = useAuth();
    
    if (user?.role === "parent") {
        return <Navigate to="/dashboard" replace />;
    } else if (user?.role === "child") {
        return <Navigate to="/child-dashboard" replace />;
    }
    
    // Default fallback if no user or unknown role
    return <Navigate to="/login" replace />;
};

export default RestrictedRoute;