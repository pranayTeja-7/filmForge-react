import SignupHeader from "../components/signup/SignupHeader";
import LandingFooter from "../components/landing/LandingFooter";
import LoginHero from "../components/login/LoginHero";

const LoginPage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <SignupHeader />
            <LoginHero />
            <LandingFooter />
        </div>
    )
}


export default LoginPage