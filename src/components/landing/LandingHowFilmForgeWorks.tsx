import LandingProcessStepCard from "./LandingProcessStepCard"
import Container from "../layout/Container"

const LandingHowFilmForgeWorks = () => {

    const steps = [
        {
            step: 1,
            label: "POST OR DISCOVER",
            title: "CREATE OR EXPLORE",
            descreption : "Create a film project and define the roles you need, or discover projects looking for collaborators.",
            keywords: "LOGLINES • OPEN ROLES • VISIONS"
        },
        {
            step: 2,
            label: "ASSEMBLE & CONNECT",
            title: "FIND YOUR CREW",
            descreption : "Discover filmmakers whose skills and interests match the project.",
            keywords: "PORTFOLIOS • CRAFT ROLES • TEAMS"
        },
        {
            step: 3,
            label: "COLLABORATION",
            title: "CONNECT & COLLABORATE",
            descreption : "Connect with the people behind the project and start building your crew.",
            keywords: "CONNECT • ALIGN • TEAM UP"
        },

    ]
    return (
        <section className="bg-filmforge-background py-9 lg:py-16 border border-filmforge-stroke/30">
            <Container>
                <div className="flex flex-col gap-6 lg:gap-12 ">
                    <div className="
                        flex
                        gap-2
                        lg:justify-between
                        flex-col lg:flex-row
                        pb-6
                        border-b border-b-filmforge-stroke/20
                    ">
                        <div className="flex flex-col gap-2">
                            <div className="
                                font-mono
                                text-[11px]
                                text-filmforge-primary
                                leading-5
                                tracking-[1.1px]
                            ">THE COLLABORATION PROCESS</div>
                            <h2 className="
                                text-[32px]
                                leading-10
                                tracking-[-0.48px]
                                text-filmforge-text
                                font-display
                                font-semibold

                            ">HOW FILMFORGE WORKS</h2>
                        </div>
                        <div className="flex items-end">
                            <p className="
                                text-[16px] lg:text-sm
                                leading-5
                                tracking-normal
                                font-body
                                text-filmforge-text-secondary
                                lg:pr-16
                            ">
                                A direct, open collaboration platform connecting creators <br className="hidden lg:block"/>
                                assembling crews and filmmakers seeking projects to join.
                            </p>
                        </div>
                    </div>
                    <div className="
                        flex
                        flex-col
                        lg:flex-row
                        gap-6
                    ">
                        {
                            steps.map((step) => {
                                return (
                                    <LandingProcessStepCard 
                                        key={step.step}
                                        step = {step.step}
                                        label = {step.label}
                                        title = {step.title}
                                        descreption = {step.descreption}
                                        keywords= {step.keywords}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default LandingHowFilmForgeWorks