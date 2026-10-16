import CompleteYourProfileHero from "../components/complete-profile/CompleteYourProfileHero"
import SignupHeader from "../components/signup/SignupHeader"
import LandingFooter from "../components/landing/LandingFooter"

const CompleteYourProfilePage = () => {
    return (
        <div className="min-h-screen flex flex-col"> 
            <SignupHeader />
            <CompleteYourProfileHero />
            <LandingFooter />
        </div>
    )
}


export default CompleteYourProfilePage
