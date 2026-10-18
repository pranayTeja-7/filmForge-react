import Container from "../layout/Container"

const LandingCraftDisciplines = () => {
    const disciplines = [
        "Director", 
        "Cinematographer", 
        "Editor", 
        "Sound Designer", 
        "Composer", 
        "Producer",
        "Actor",
        "Music Director"
    ]
    return (
        <section className=" bg-filmforge-background border border-filmforge-stroke/30 py-5">
            <Container>
                <div className="
                    flex
                    flex-col
                    gap-3.5
                    lg:flex-row
                    justify-between
                ">
                    <div className="
                        flex 
                        gap-2 
                        items-center
                    ">
                        <span className="block w-1.5 h-1.5 rounded-[50%] bg-filmforge-primary "></span>
                        <h2 className="
                            text-[11px]
                            leading-5
                            font-mono
                            text-filmforge-text-tertiary
                            tracking-[1.1px]
                        ">CRAFT DISCIPLINES:</h2>
                    </div>
                    <div className="
                        flex
                        gap-2
                        flex-wrap
                        gap-y-3
                    ">
                        {
                            disciplines.map((discipline) => {
                                return (
                                    <div key={discipline} className="
                                        text-xs
                                        font-mono
                                        leading-4
                                        tracking-normal
                                        px-3
                                        py-1
                                        rounded-xs
                                        bg-filmforge-background-secondary
                                        text-filmforge-text-secondary
                                        hover:text-filmforge-primary
                                        border 
                                        border-filmforge-stroke/40
                                        whitespace-nowrap
                                    ">{discipline}</div>
                                )
                            })
                        }
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default LandingCraftDisciplines