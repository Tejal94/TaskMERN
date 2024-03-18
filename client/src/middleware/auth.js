import { Navigate } from "react-router-dom";
import { useAuth } from "../helper/AuthContext";

export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}


export const ProtectRoute = ({ children }) => {
    const { username } = useAuth();
    if(!username){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}