import LandingHeader from "../components/landing/LandingHeader";
import LandingHero from "../components/landing/LandingHero";
import LandingHowFilmForgeWorks from "../components/landing/LandingHowFilmForgeWorks";
import LandingCraftDisciplines from "../components/landing/LandingCraftDisciplines";
import LandingFooter from "../components/landing/LandingFooter";

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <LandingHeader />
            <main className="flex-1 flex flex-col justify-center bg-filmforge-background">
                <LandingHero />
                <LandingHowFilmForgeWorks />
                <LandingCraftDisciplines />
            </main>
            <LandingFooter />
        </div>
    )
}

export default LandingPage