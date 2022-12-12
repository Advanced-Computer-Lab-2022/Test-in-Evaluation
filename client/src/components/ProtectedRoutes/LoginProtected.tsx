import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";

const ProtectedRoutes = () => {
    const { loggedIn } = useContext(UserContext);
    if (!loggedIn) {
        return <Navigate to="/signin" />;
    }
    return <Outlet />;
};

export default ProtectedRoutes;
