import Container from "../layout/Container"
import TitleLogo from "../common/TitleLogo"

const LandingFooter = () => {
    return (
        <footer className="bg-filmforge-background py-6 border border-filmforge-stroke/30">
            <Container>
                <div className="
                    flex
                    flex-col
                    lg:flex-row
                    items-start lg:items-center
                    gap-5 
                    
                ">
                    <div className="
                        flex
                        flex-col sm:flex-row
                        items-start sm:items-center
                        flex-1
                        w-full lg:w-auto
                        justify-between
                        gap-5
                    ">
                        <TitleLogo size="footer"/>
                        <nav>
                            <ul className="
                                flex
                                flex-col sm:flex-row
                                gap-2 sm:gap-5
                                text-xs
                                leading-4
                                font-mono
                                tracking-[0.12px]
                                text-filmforge-text-tertiary
                            " >
                                <li className="hover:text-filmforge-primary"><a href="">Community Guidelines</a></li>
                                <li className="hover:text-filmforge-primary"><a href="">Privacy</a></li>
                                <li className="hover:text-filmforge-primary"><a href="">Terms</a></li>
                            </ul>
                        </nav>
                    </div>
                    <p className="
                        text-filmforge-stroke
                        justify-self-end
                        text-xs
                        leading-4
                        font-mono
                        tracking-[0.12px]
                    ">© 2026 FilmForge · Built for independent filmmakers.</p>
                    
                </div>
            </Container>
        </footer>
    )
}

export default LandingFooter