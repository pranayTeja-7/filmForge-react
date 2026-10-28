import AuthErrorHero from "../components/common/AuthErrorHero"
import SignupHeader from "../components/signup/SignupHeader"

const AuthErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col"> 
            <SignupHeader />
            <AuthErrorHero/>
        </div>
    )
}


export default AuthErrorPage