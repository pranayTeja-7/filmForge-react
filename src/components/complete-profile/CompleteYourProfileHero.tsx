import OnboardingHeroIntro from "../common/signup-and-onboarding/OnboardingHeroIntro"
import OnboardingOuterCard from "../common/signup-and-onboarding/OnboardingOuterCard"
import Container from "../layout/Container"
import { ArrowRight, Info } from "lucide-react"

const CompleteYourProfileHero = () => {
    return (
        <main className="bg-filmforge-background py-5 filmforge-400:py-8 flex-1 flex flex-col justify-center">
            <Container>
                <div className="flex justify-center items-center">
                    <OnboardingOuterCard maxWidthClass="max-w-xl">
                        <OnboardingHeroIntro 
                            label="ACCOUNT CREATED"
                            title="COMPLETE YOUR PROFILE"
                            description="Tell filmmakers a little about yourself, what you do, and the kind of work you want to make."
                        />

                        <div className="w-full flex flex-col gap-3">  
                            <div className="
                                flex 
                                flex-col-reverse filmforge-400:flex-row
                                gap-2
                                items-start filmforge-400:items-center 
                                justify-between border 
                                border-filmforge-primary/50  
                                border-l-filmforge-primary border-l-[6px]
                                p-3.5 filmforge-400:p-5 
                                rounded-md
                            ">
                                <div>

                                    <div className="">
                                        <h2 className="
                                            font-body
                                            font-semibold
                                            text-filmforge-text
                                            text-[15px] filmforge-400:text-[16px]
                                            leading-5.5
                                            tracking-[0.4px]
                                        ">01 — ABOUT YOU</h2>
                                        <p className="
                                            font-body
                                            text-xs
                                            text-filmforge-text-4
                                            leading-4.5
                                            tracking-[0.12px]
                                            hidden filmforge-480:block
                                        ">Your basic filmmaker identity</p>
                                    </div>
                                </div>
                                <div className="
                                    py-1 
                                    px-2.5
                                    bg-filmforge-primary/15 
                                    border 
                                    border-filmforge-primary/30 
                                    rounded-xl
                                    flex
                                    items-center   
                                    gap-1.5

                                ">
                                    <div className="
                                        w-1.5 h-1.5 bg-filmforge-primary rounded-[50%]
                                    "></div>
                                    <div className="
                                        font-mono
                                        font-semibold
                                        text-[11px]
                                        text-filmforge-primary
                                        leading-3.5
                                        tracking-[0.55px]
                                    ">UP NEXT</div>
                                </div>
                            </div>
                            <div className="
                                flex 
                                flex-col-reverse filmforge-400:flex-row
                                gap-2
                                items-start filmforge-400:items-center 
                                justify-between border 
                                border-filmforge-stroke-secondary
                                p-4 filmforge-400:p-5 rounded-md

                            ">
                                <div>

                                    <div className="">
                                        <h2 className="
                                            font-body
                                            font-semibold
                                            text-filmforge-text/70
                                            text-[16px]
                                            leading-5.5
                                            tracking-[0.4px]
                                        ">02 — YOUR ROLES</h2>
                                        <p className="
                                            font-body
                                            text-xs
                                            text-filmforge-text-4
                                            leading-4.5
                                            tracking-[0.12px]
                                            hidden filmforge-480:block
                                        ">What you do on a film</p>
                                    </div>
                                </div>
                                
                                <div className="
                                    border border-filmforge-stroke-secondary
                                    py-1 
                                    px-2.5
                                    font-mono
                                    font-semibold
                                    text-[11px]
                                    text-filmforge-text-4
                                    leading-3.5
                                    tracking-[0.55px]
                                    rounded-md
                                ">STEP 2</div>
                                
                            </div>
                            <div className="
                                flex 
                                flex-col-reverse filmforge-400:flex-row
                                gap-2
                                items-start filmforge-400:items-center 
                                justify-between border 
                                border-filmforge-stroke-secondary
                                p-4 filmforge-400:p-5 rounded-md
                            ">
                                <div>

                                    <div className="">
                                        <h2 className="
                                            font-body
                                            font-semibold
                                            text-filmforge-text/70
                                            text-[16px]
                                            leading-5.5
                                            tracking-[0.4px]
                                        ">03 — PORTFOLIO</h2>
                                        <p className="
                                            font-body
                                            text-xs
                                            text-filmforge-text-4
                                            leading-4.5
                                            tracking-[0.12px]
                                            hidden filmforge-480:block
                                        ">Work you'd like to showcase</p>
                                    </div>
                                </div>
                                
                                <div className="
                                    border border-filmforge-stroke-secondary
                                    py-1 
                                    px-2.5
                                    font-mono
                                    font-semibold
                                    text-[11px]
                                    text-filmforge-text-4
                                    leading-3.5
                                    tracking-[0.55px]
                                    rounded-md
                                ">STEP 3</div>
                                
                            </div>
                        </div>  
                        
                        <div className="w-full flex flex-col gap-3">
                            <button className="
                                font-display
                                font-semibold
                                text-[11.5px] filmforge-400:text-sm
                                text-filmforge-background
                                bg-filmforge-primary
                                leading-5
                                tracking-[0.7px]
                                flex
                                items-center
                                justify-center
                                gap-1
                                py-3.5
                                rounded-md
                                hover:cursor-pointer
                            ">
                                <span>LET'S SET UP YOUR PROFILE</span> 
                                <ArrowRight className="h-4.5 w-4.5 self-start hidden filmforge-400:block"/>
                            </button>
                            <div className="flex items-center justify-center gap-2 p-3 bg-filmforge-background-5 border border-filmforge-stroke-secondary">
                                <Info className="
                                    w-6 h-5
                                    text-filmforge-primary
                                    
                                "/>
                                <p className="
                                    text-xs
                                    leading-4.75
                                    tracking-normal
                                    text-filmforge-text-4
                                ">
                                    You can update your profile anytime.
                                </p>
                            </div>
                        </div>
                    </OnboardingOuterCard>
                </div>
            </Container>
        </main>    
    )
}

export default CompleteYourProfileHero