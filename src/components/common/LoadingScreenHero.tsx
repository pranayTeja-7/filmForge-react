import OnboardingOuterCard from "./signup-and-onboarding/OnboardingOuterCard";
import OnboardingHeroIntro from "./signup-and-onboarding/OnboardingHeroIntro";
import Container from "../layout/Container";

const LoadingScreenHero = () => {

    return (
        <main className="bg-filmforge-background py-5 filmforge-400:py-8 flex-1 flex flex-col justify-center">
            <Container>
                <div className="flex flex-col items-center gap-6">
                    <OnboardingOuterCard maxWidthClass="max-w-xl w-full">
                        <OnboardingHeroIntro 
                            label="LOADING FILMFORGE"
                            title="Getting things ready..."
                            description="We're checking your session so we can take you to the right place."
                        />
                    </OnboardingOuterCard>
                    <div>
                        <div className="
                            text-xs text-filmforge-text-4
                            font-display
                            leading-4.5 tracking-[0.12px]
                        ">This will only take a moment.</div>
                    </div>
                </div>
            </Container>
        </main>
    )
}

export default LoadingScreenHero