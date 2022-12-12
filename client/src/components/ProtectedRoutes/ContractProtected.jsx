import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";

const ContractProtected = () => {
    const { userInfo } = useContext(UserContext);

    if (userInfo?.type === "instructor" && !userInfo?.acceptedContract) {
        return <Navigate to="/contract" />;
    }
    return <Outlet />;
};

export default ContractProtected;
