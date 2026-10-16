import OnboardingStatus from "../Onboarding/OnboardingStatus"
import OnboardingHeroIntro from "../common/signup-and-onboarding/OnboardingHeroIntro"
import OnboardingFormButton from "../common/signup-and-onboarding/OnboardingFormButton"
import OnboardingOuterCard from "../common/signup-and-onboarding/OnboardingOuterCard"
import Container from "../layout/Container"

const OnboardingAboutYouHero = () => {
    return (
        <main className="py-10 bg-filmforge-background flex-1 flex flex-col justify-center">
            <Container>
                <div className="flex justify-center">
                    <div className="max-w-160 w-full flex flex-col gap-8">
                        <OnboardingStatus status="yourRoles"/>
                        <OnboardingOuterCard maxWidthClass="w-full">
                            <OnboardingHeroIntro 
                                label="STEP 01 · ABOUT YOU"
                                title="TELL US ABOUT YOU"
                                description="
                                    Create your filmmaker identity so collaborators know who you are and the
                                    perspective you bring to a production.
                                "
                            />
                            <form action="" className="w-full flex flex-col gap-5" >
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between ">
                                        <label htmlFor="email" className="
                                            text-xs filmforge-400:text-sm
                                            text-filmforge-label
                                            font-mono
                                            leading-4
                                            tracking-[0.6px]
                                            font-semibold
                                        ">DISPLAY NAME</label>
                                        <div className="
                                            text-[10px]
                                            text-filmforge-background-7
                                            font-mono
                                            font-semibold
                                            leading-3.75
                                            tracking-[0.5px]
                                            bg-filmforge-background-7/10
                                            border border-filmforge-background-7/20
                                            rounded-xs
                                            py-0.5
                                            px-1.5
                                        ">REQUIRED</div>
                                    </div>
                                    <input 
                                        type="text"
                                        name="displayName" 
                                        id="displayName" 
                                        placeholder="How should people know you?"
                                        className="
                                            placeholder:text-xs filmforge-400:placeholder:text-sm
                                            placeholder:tracking-normal
                                            placeholder:text-filmforge-placeholder
                                            placeholder:font-body
                                            px-4 py-3.5
                                            bg-filmforge-background-6
                                            border border-filmforge-stroke-secondary
                                            rounded-md
                                            text-filmforge-text
                                            w-full
                                        "
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between ">
                                        <label htmlFor="email" className="
                                            text-xs filmforge-400:text-sm
                                            text-filmforge-label
                                            font-mono
                                            leading-4
                                            tracking-[0.6px]
                                            font-semibold
                                        ">BIO</label>
                                        <div className="
                                            text-[10px]
                                            text-filmforge-text-4
                                            font-mono
                                            font-semibold
                                            leading-3.75
                                            tracking-[0.5px]
                                            py-0.5
                                            px-1.5
                                        ">OPTIONAL</div>
                                    </div>
                                    <textarea 
                                        name="bio" 
                                        id="bio" 
                                        placeholder="Tell people a little about yourself, your filmmaking interests, or the kind of projects you enjoy."
                                        className="
                                            placeholder:text-xs filmforge-400:placeholder:text-sm
                                            placeholder:tracking-normal
                                            placeholder:text-filmforge-placeholder
                                            placeholder:font-body
                                            px-4 py-3.5
                                            bg-filmforge-background-6
                                            border border-filmforge-stroke-secondary
                                            rounded-md
                                            text-filmforge-text
                                            w-full
                                        "
                                    ></textarea>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between ">
                                        <label htmlFor="email" className="
                                            text-xs filmforge-400:text-sm
                                            text-filmforge-label
                                            font-mono
                                            leading-4
                                            tracking-[0.6px]
                                            font-semibold
                                        ">LOCATION</label>
                                        <div className="
                                            text-[10px]
                                            text-filmforge-text-4
                                            font-mono
                                            font-semibold
                                            leading-3.75
                                            tracking-[0.5px]
                                            py-0.5
                                            px-1.5
                                        ">OPTIONAL</div>
                                    </div>
                                    <input 
                                        type="text"
                                        name="location" 
                                        id="location" 
                                        placeholder="City or region (e.g. Los Angeles, CA)"
                                        className="
                                            placeholder:text-xs filmforge-400:placeholder:text-sm
                                            placeholder:tracking-normal
                                            placeholder:text-filmforge-placeholder
                                            placeholder:font-body
                                            px-4 py-3.5
                                            bg-filmforge-background-6
                                            border border-filmforge-stroke-secondary
                                            rounded-md
                                            text-filmforge-text
                                            w-full
                                        "
                                    />
                                </div>      
                                <OnboardingFormButton text="CONTINUE TO YOUR ROLES"/>                          
                            </form>
                        </OnboardingOuterCard>
                    </div>
                </div>
            </Container>
        </main>
    )
}

export default OnboardingAboutYouHero