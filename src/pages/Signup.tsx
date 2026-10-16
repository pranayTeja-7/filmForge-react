import SignupHeader from "../components/signup/SignupHeader"
import SignupHero from "../components/signup/SIgnupHero"
import LandingFooter from "../components/landing/LandingFooter"

const SignupPage = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <SignupHeader />
            <SignupHero />
            <LandingFooter />
        </div>
    )
}

export default SignupPage