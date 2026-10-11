import LandingHeader from "../components/landing/LandingHeader";
import LandingHero from "../components/landing/LandingHero";
import LandingHowFilmForgeWorks from "../components/landing/LandingHowFilmForgeWorks";
import LandingCraftDisciplines from "../components/landing/LandingCraftDisciplines";
import LandingFooter from "../components/landing/LandingFooter";

const LandingPage = () => {
    return (
        <>
            <LandingHeader />
            <main>
                <LandingHero />
                <LandingHowFilmForgeWorks />
                <LandingCraftDisciplines />
            </main>
            <LandingFooter />
        </>
    )
}

export default LandingPage