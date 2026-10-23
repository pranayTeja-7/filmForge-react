import OnboardingRolesHero from "../components/Onboarding/OnboardingRolesHero"
import SignupHeader from "../components/signup/SignupHeader";
import LandingFooter from "../components/landing/LandingFooter";

const OnboardingRolesPage = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <SignupHeader />
            <OnboardingRolesHero />
            <LandingFooter />
        </div>
    )
}


export default OnboardingRolesPage;