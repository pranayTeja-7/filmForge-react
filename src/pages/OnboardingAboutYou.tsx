import OnboardingAboutYouHero from "../components/OnboardingAboutYou/OnboardingAboutYouHero"
import SignupHeader from "../components/signup/SignupHeader"
import LandingFooter from "../components/landing/LandingFooter"

const OnboardingAboutYouPage = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <SignupHeader />
            <OnboardingAboutYouHero />
            <LandingFooter />
        </div>
    )
}

export default OnboardingAboutYouPage