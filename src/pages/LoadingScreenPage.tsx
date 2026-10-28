import LoadingScreenHero from "../components/common/LoadingScreenHero"
import SignupHeader from "../components/signup/SignupHeader"

const LoadingScreenPage = () => {
    return (
        <div className="min-h-screen flex flex-col"> 
            <SignupHeader />
            <LoadingScreenHero/>
        </div>
    )
}


export default LoadingScreenPage