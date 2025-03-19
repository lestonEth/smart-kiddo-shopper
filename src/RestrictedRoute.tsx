import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const RestrictedRoute: React.FC = () => {
    const { user } = useAuth();
    console.log("user hook",  user)
    return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default RestrictedRoute;
