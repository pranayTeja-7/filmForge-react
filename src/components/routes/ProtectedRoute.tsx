import AuthContext from "../../AuthContext"
import { useContext } from "react"
import type { ReactNode } from "react"
import { Navigate } from "react-router"


type ProtectedRoutePropsType = {
    children:ReactNode
}


const ProtectedRoute = (props:ProtectedRoutePropsType) => {
    const auth = useContext(AuthContext);
    if(!auth){
        throw new Error("Protected Route component must be used only inside auth provider")
    }

    const {authState} = auth;

    if(authState.status === "unauthenticated"){
        return <Navigate to="/login"  replace/>
    }

    return (
        props.children
    );
}

export default ProtectedRoute