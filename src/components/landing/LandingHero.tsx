import Container from "../layout/Container"
import { ArrowRight } from "lucide-react"
import heroImage from "../../assets/images/landing-hero-image.png"
import { Link } from "react-router"

const LandingHero = () => {
    return (
        <section className="bg-filmforge-background pt-7 pb-9 lg:pb-16 sm:pt-16 ">
            <Container>
                <div className="flex flex-col lg:flex-row lg:justify-between gap-5.5 filmforge-400:gap-9 lg:gap-6">
                    <div className="w-full lg:w-1/2 flex flex-col gap-5 ">
                
                        <div className="
                            flex 
                            items-center
                            px-3
                            py-1
                            rounded-xl
                            bg-filmforge-background-secondary
                            w-fit
                            gap-1.75
                        ">
                            <div className="w-1.5 h-1.5 bg-filmforge-primary rounded-[50%]"></div>
                            <div className="
                                font-mono
                                text-[10px]
                                leading-5
                                tracking-[1px]
                                font-medium
                                text-filmforge-primary
                                
                            ">INDIE & STUDENT FILMMAKERS • OPEN COLLABORATION</div>
                        </div>
                        <h1 className="
                            text-[27px] filmforge-400:text-[32px] sm:text-[46px] 
                            leading-9 sm:leading-11.5 
                            tracking-[-0.8px] sm:tracking-[-1.15px]
                            font-extrabold
                            font-display
                            text-filmforge-text
                        ">
                            FIND YOUR<br className="hidden lg:block"/>
                            CREW. <br /> 
                            <span className="text-filmforge-primary">MAKE YOUR <br />FILM.</span><br />
                            <hr className="h-1 w-12 bg-filmforge-primary mt-3 border-0"/>
                        </h1>
                        <p className="
                            text-filmforge-text-secondary
                            text-sm sm:text-[16px]
                            leading-5.5 sm:leading-6.5
                            tracking-normal
                            font-body
                            md:pr-6
                        ">
                            FilmForge is an open collaboration space where you can create film projects
                            and assemble your crew, or discover active projects and join the team. Built
                            for independent, student, and emerging filmmakers.
                        </p>
                        <div className="
                            flex
                            gap-3
                            filmforge-400:justify-start
                            flex-col filmforge-400:flex-row
                        ">
                            <Link to="/signup" className="
                                flex gap-2
                                items-center
                                justify-center
                                text-sm filmforge-400:text-[12px]
                                leading-3.5
                                tracking-[1.1px]
                                font-body
                                text-filmforge-background
                                bg-filmforge-primary
                                filmforge-400:px-6
                                py-3.5 filmforge-400:py-2.5 sm:py-4.25
                                rounded-md
                                font-semibold
                                hover:bg-filmforge-primary/85
                            "><span>GET STARTED</span> <ArrowRight className="h-4 w-4"/> </Link>
                            <Link to="/login" className="
                                flex
                                items-center
                                justify-center
                                text-sm filmforge-400:text-[12px]
                                leading-3.5
                                tracking-[1.1px]
                                font-body
                                filmforge-400:px-6
                                py-4
                                rounded-md
                                bg-filmforge-background-secondary
                                text-filmforge-text
                                hover:border
                                hover:border-filmforge-primary
                                hover:text-filmforge-primary
                                hover:px-5.75

                            ">LOG IN</Link>
                        </div>
                    </div>
                    <div className="w-full  lg:w-1/2 p-2.25 bg-filmforge-background-4 flex flex-col border border-filmforge-stroke/50 rounded-lg">
                        <div className="
                            flex 
                            items-center 
                            justify-between 
                            bg-filmforge-background-tertiary
                            px-3
                            font-mono
                            text-[8px] filmforge-400:text-[10px] sm:text-xs
                            leading-4
                            tracking-[0.66px]
                            py-1.75
                        ">
                            <div className="text-filmforge-primary flex items-center gap-1.5"><span className="block  w-2 h-2 rounded-[50%] bg-filmforge-recording"></span><span className="text-filmforge-recording mr-1">REC</span> TC 00:14:22:08</div>
                            <div className="text-filmforge-primary"><span className="text-filmforge-text">24.00 FPS</span> 3200K</div>
                        </div>
                        <div className="relative lg:flex-1 flex  md:h-[40vw] lg:h-auto">
                            <div className="
                                flex 
                                justify-between 
                                text-[10px]
                                leading-5
                                tracking-normal
                                py-0.5
                                px-3
                                text-filmforge-text-tertiary
                                absolute
                                top-0
                                w-full
                                bg-black/80
                                font-mono
                            ">
                                <div>MATTE 2.39:1</div>
                                <div>S35 SENSOR</div>
                            </div>
                            <img src={heroImage}alt="Filmmakers reviewing footage on a camera monitor" className="w-full object-cover object-top lg:object-cover flex-1 h-full"/>
                            <div className="
                                flex 
                                justify-between 
                                text-[10px]
                                leading-5
                                tracking-normal
                                py-0.5
                                px-3
                                text-filmforge-text-tertiary
                                absolute
                                bottom-0
                                w-full
                                bg-black/80
                                font-mono
                            ">
                                <div>STAGE 4</div>
                                <div>CAM A</div>
                            </div>
                        </div>
                        <div className="
                            flex 
                            items-center 
                            justify-between 
                            bg-filmforge-background-tertiary
                            px-3
                            font-mono
                            text-[8px] sm:text-[10px]
                            leading-5
                            tracking-normal
                            py-1.75
                        ">
                            <div className="text-filmforge-text hidden filmforge-400:block">PRORES 4444 XQ</div>
                            <div className="text-filmforge-text-tertiary">OPEN TO EMERGING, STUDENT, AND INDEPENDENT CREATORS</div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default LandingHero