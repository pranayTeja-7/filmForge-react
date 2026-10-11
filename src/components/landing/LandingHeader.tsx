import Container from "../layout/Container"
import TitleLogo from "../common/TitleLogo"
import { Link } from "react-router"


const LandingHeader = () => {
    return (
        <header className="bg-filmforge-background  py-4 border border-filmforge-stroke/30">
            <Container>
                <div className="
                        flex 
                        justify-between 
                        items-center
                    ">
                    <TitleLogo size="landingHeader"/>
                    <nav className="">
                        <ul className="flex justify-between items-center gap-3 filmforge-400:gap-4 sm:gap-3">
                            <li><Link to="/login" className="
                                font-body 
                                text-[11px] 
                                px-0 sm:px-5 
                                py-0 sm:py-2.5  
                                text-filmforge-text-secondary 
                                tracking-[0.55px] 
                                leading-3.5 
                                font-semibold
                                hover:text-white
                            ">LOG IN</Link></li>
                            <li><Link to="/signup" className="
                                bg-filmforge-primary 
                                px-3.5 sm:px-5 
                                py-2 sm:py-2.5
                                text-filmforge-background 
                                text-[11px] 
                                font-body 
                                rounded-md
                                tracking-[1.1px] 
                                leading-3.5 
                                font-semibold
                                flex 
                                justify-center
                                hover:bg-filmforge-primary/85
                            ">JOIN <span className="hidden sm:block">&nbsp;FILMFORGE</span></Link></li>
                        </ul>
                    </nav>
                </div>
            </Container>
        </header>
    )
}

export default LandingHeader