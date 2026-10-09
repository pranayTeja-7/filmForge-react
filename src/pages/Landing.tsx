import LandingHeader from "../components/LandingHeader";
import LandingHero from "../components/LandingHero";
import LandingHowFilmForgeWorks from "../components/LandingHowFilmForgeWorks";
import LandingCraftDisciplines from "../components/LandingCraftDisciplines";
import LandingFooter from "../components/LandingFooter";

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