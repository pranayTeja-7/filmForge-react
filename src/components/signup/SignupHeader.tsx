import TitleLogo from "../common/TitleLogo";
import { Link } from "react-router";
import Container from "../layout/Container";

const SignupHeader = () => {
    return (
        <header className="bg-filmforge-background border border-filmforge-stroke-secondary">
            <Container>
                <div className="flex justify-between py-5 items-center">
                    <TitleLogo size="signupHeader"/>
                    <Link to="/login" className="
                        font-body 
                        text-[11px] 
                        px-0 sm:px-5 
                        py-0 sm:py-2.5  
                        text-filmforge-text-secondary 
                        tracking-[0.55px] 
                        leading-3.5 
                        font-semibold
                        hover:text-white
                    ">LOG IN</Link>
                </div>
            </Container>
        </header>
    )
}

export default SignupHeader