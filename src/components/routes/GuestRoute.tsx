import { Navigate } from "react-router";
import type { ReactNode } from "react";
import AuthContext from "../../AuthContext";
import { useContext } from "react";


type GuestRouteProps = {
    children:ReactNode
}


const GuestRoute = (props:GuestRouteProps) => {

    const auth = useContext(AuthContext);
    
    if(!auth){
        throw new Error("Guest Route should be used inside the AuthProvider")
    }

    const {authState} = auth

    if(authState.status === "authenticated"){

        if(!authState.user?.profile){
            return <Navigate to="/complete-profile" replace/>
        }

        if(auth.authState.user?.profile?.onboardingStatus === "ROLES"){
            return <Navigate to="/complete-profile/your-roles" replace/>
        }

        if(auth.authState.user?.profile?.onboardingStatus === "PORTFOLIO"){
            return <Navigate to="/complete-profile/portfolio" replace/>
        }

        if(auth.authState.user?.profile?.onboardingStatus === "COMPLETED"){
            return <Navigate to="/" replace/>
        }
    }

    return (
        props.children
    )
}

export default GuestRoute