import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RestrictedRoute: React.FC = () => {
    const { user } = useAuth();
    if (user?.role === "parent") {
        return <Navigate to="/child-dashboard" />;
    } else if (user?.role === "child") {
        return <Navigate to="/dashboard" />;
    }
    return <Outlet />;
};

export default RestrictedRoute;
