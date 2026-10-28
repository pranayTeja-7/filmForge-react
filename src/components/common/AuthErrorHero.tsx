import OnboardingOuterCard from "./signup-and-onboarding/OnboardingOuterCard";
import OnboardingHeroIntro from "./signup-and-onboarding/OnboardingHeroIntro";
import Container from "../layout/Container";
import { useContext } from "react";
import AuthContext from "../../AuthContext";

const AuthErrorHero = () => {

    const auth = useContext(AuthContext);
    if(!auth){
        throw new Error("AuthError must be used within AuthProvider")
    }
    const {authState, retryAuth} = auth

    return (
        <main className="bg-filmforge-background py-5 filmforge-400:py-8 flex-1 flex flex-col justify-center">
            <Container>
                <div className="flex flex-col items-center">
                    <OnboardingOuterCard maxWidthClass="max-w-xl w-full">
                        <OnboardingHeroIntro 
                            label="SESSION ERROR"
                            title="Unable to verify your session"
                            description="We couldn't connect to FilmForge to verify your session. This may be a temporary network or server issue. Please try again."
                        />
                        <button disabled={authState.status === "loading" ? true : false} type="button" onClick={async () => {await retryAuth()}} className="
                            font-display
                            font-semibold
                            text-[11.5px] filmforge-400:text-sm
                            text-filmforge-background
                            bg-filmforge-primary
                            leading-5
                            tracking-[0.7px]
                            flex
                            items-center
                            justify-center
                            gap-1
                            py-3.5
                            rounded-md
                            hover:cursor-pointer
                            w-full
                        ">{authState.status === "loading" ? "RETRYING..." : "TRY AGAIN" }</button>
                    </OnboardingOuterCard>
                    
                </div>
            </Container>
        </main>
    )
}

export default AuthErrorHero