import AuthContext, { type AuthState } from "./AuthContext";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import requestFunction from "./api";
import { ApiError } from "./errors/ApiError";


type AuthProviderPropsType = {
    children:ReactNode
}


const AuthProvider = (props:AuthProviderPropsType) => {
    
    const[authState, setAuthState] = useState<AuthState>({
        status: "loading",
        user: null,
        error: null
    })

    const getMe = async () => {
        try {
            setAuthState({
                status: "loading",
                user:null,
                error:null
            })
            const {response, data} = await requestFunction("auth/me", {
                method:"get"
            }) 
            if(response.status === 200){
                setAuthState({
                    status: "authenticated",
                    user: data.userData,
                    error: null
                })
            }
        } catch (error) {
            if(error instanceof ApiError && error.status === 401){
                setAuthState({
                    status: "unauthenticated",
                    user: null,
                    error: null
                })
                return
            }

            setAuthState({
                status: "error",
                user: null,
                error: "Unable to verify your session. Please try again",
            })

            console.log(error)
        }
    }

    const retryAuth = getMe

    useEffect(() => {
        const callGetme = async () => {
            await getMe()
        }
        callGetme()
    },[])

    return (
        <AuthContext.Provider value={{authState, retryAuth}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider