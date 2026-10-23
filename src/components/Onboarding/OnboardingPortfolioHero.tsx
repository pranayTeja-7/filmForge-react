import OnboardingOuterCard from "../common/signup-and-onboarding/OnboardingOuterCard";
import OnboardingStatus from "./OnboardingStatus";
import Container from "../layout/Container";
import OnboardingHeroIntro from "../common/signup-and-onboarding/OnboardingHeroIntro";
import { Clapperboard } from "lucide-react";
import OnboardingFormButton from "../common/signup-and-onboarding/OnboardingFormButton";
import { Link } from "react-router";
import OnboardingPortfolioPopUp from "./OnboardingPortfolioPopUp";
import { useState } from "react";


const OnboardingPortfolioHero = () => {

    type itemData = {
        title:string,
        type:string,
        description:string|null
        externalUrl:string|null,
    }

    const [portfolioItems, setPortfolioItems] = useState<itemData[]>([]);
    
    const [modalDisplay, setModalDisplay] = useState("hidden")

    const closeModal = () => {
        setModalDisplay("hidden")
    }

    return (
        <main className="bg-filmforge-background py-5 filmforge-400:py-8 flex-1 flex flex-col justify-center">
            <Container>
                <div className="flex flex-col items-center w-full">
                    <div className="flex flex-col gap-8 max-w-155 w-full">
                        <OnboardingStatus status="portfolio"/>
                        <OnboardingOuterCard maxWidthClass="w-full">
                            <OnboardingHeroIntro 
                                label="STEP 03 · PORTFOLIO"
                                title="SHOWCASE YOUR WORK"
                                description="
                                    Add a few projects or pieces of work you'd like other filmmakers to see. You
                                    can always add more later.
                                "
                            />
                            <div className="
                                flex flex-col 
                                items-center gap-3 
                                w-full
                                bg-filmforge-background-6 
                                rounded-md
                                border-2 border-dashed border-filmforge-stroke-secondary
                                py-6 filmforge-400:py-7 sm:py-12 
                                px-2.5 sm:px-8
                                hover:border-filmforge-primary/50
                            ">
                                <div className="
                                    p-4
                                    bg-filmforge-background-5
                                    rounded-md
                                    border border-filmforge-stroke-secondary
                                ">
                                    <Clapperboard size={23} className="text-filmforge-primary"/>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="
                                        font-body font-semibold
                                        text-sm filmforge-400:text-[16px] 
                                        text-filmforge-text
                                        leading-5.5
                                        tracking-[0.4px]
                                        text-center
                                    ">NO PORTFOLIO ITEMS YET</div>
                                    <p className="
                                        font-body 
                                        text-[10px] filmforge-400:text-xs 
                                        text-filmforge-text-4
                                        leading-4 filmforge-400:leading-4.5
                                        text-center
                                        tracking-[0.12px]
                                    "
                                    >Add your first piece of work to start building your portfolio.</p>
                                </div>
                                <button onClick={() => {setModalDisplay("block")}} className="
                                    py-3.25
                                    px-5
                                    bg-filmforge-background-5
                                    border-2 border-filmforge-stroke-secondary
                                    rounded-md
                                    flex items-center gap-1.5
                                    font-display font-semibold
                                    hover:cursor-pointer
                                    hover:border-filmforge-primary/50
                                ">
                                    <div className="text-filmforge-text text-3xl hidden filmforge-400:block ">+</div>
                                    <div className="
                                        text-[10px] filmforge-400:text-xs 
                                        text-filmforge-text
                                        leading-4
                                        tracking-[0.6px]
                                    ">ADD PORTFOLIO ITEM</div>
                                </button>
                            </div>
                            <div className="flex flex-col gap-2.5 items-center w-full">
                                <OnboardingFormButton text="FINISH PROFILE"/>
                                <Link to="/" className="
                                    font-medium font-mono
                                    text-filmforge-text-4
                                    text-[11px]
                                    leading-3.5
                                    tracking-[1.1px]
                                    hover:text-filmforge-text
                                ">SKIP FOR NOW</Link>
                            </div>
                        </OnboardingOuterCard>
                    </div>
                </div>
                <div className={`
                    flex 
                    flex-col 
                    items-center 
                    justify-center
                    w-full
                    fixed
                    inset-0
                    h-full
                    bg-black/80
                    ${modalDisplay}
                `}>
                    <OnboardingPortfolioPopUp closeModel={closeModal}/>
                </div>
            </Container>
        </main>
    )
}


export default OnboardingPortfolioHero