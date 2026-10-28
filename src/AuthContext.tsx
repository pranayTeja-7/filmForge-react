import { createContext } from "react";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated" | "error";

export type AuthUser = {
    id: string,
    email: string,
    profile: {onboardingStatus: string} | null,
} | null

export type AuthState = {
    status: AuthStatus,
    user: AuthUser,
    error: string | null,
}

export type AuthContextType = {
    authState: AuthState,
    retryAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default AuthContext;