import { Navigate } from "react-router";
import type { ReactNode } from "react";
import AuthContext from "../../AuthContext";
import { useContext } from "react";
import { useLocation } from "react-router";


type OnboardingRoutePropsType = {
    children:ReactNode
}

const OnboardingRoute = (props:OnboardingRoutePropsType) => {

    const location = useLocation()

    const auth = useContext(AuthContext);
    
    if(!auth){
        throw new Error("Guest Route should be used inside the AuthProvider")
    }

    const { authState } = auth ;
    console.log("Onboarding route:", {
        path: location.pathname,
        status: authState.status,
        user: authState.user
    });

    if(!authState.user?.profile){
        if(location.pathname === "/complete-profile"){
            return props.children
        }

        if(location.pathname === "/complete-profile/about-you"){
            return props.children
        }

        return <Navigate to="/complete-profile" replace/>
    }
    
    if(authState.user?.profile.onboardingStatus === "ROLES"){
        if(location.pathname === "/complete-profile/your-roles"){
            return props.children
        }
        return <Navigate to="/complete-profile/your-roles" replace/>
    }

    if(authState.user?.profile.onboardingStatus === "PORTFOLIO"){
        if(location.pathname === "/complete-profile/portfolio"){
            return props.children
        }
        return <Navigate to="/complete-profile/portfolio" replace/>
    }

    if(authState.user?.profile.onboardingStatus === "COMPLETED"){
        if(location.pathname === "/"){
            return props.children
        }
        return <Navigate to="/" replace/>
    }
}


export default OnboardingRoute