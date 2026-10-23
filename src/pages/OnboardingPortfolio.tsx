import OnboardingPortfolioHero from "../components/Onboarding/OnboardingPortfolioHero"
import SignupHeader from "../components/signup/SignupHeader"
import LandingFooter from "../components/landing/LandingFooter"

const OnboardingPortfolioPage = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <SignupHeader />
            <OnboardingPortfolioHero />
            <LandingFooter />
        </div>
    )
}

export default OnboardingPortfolioPage