import Container from "../layout/Container"

const CompleteYourProfileHero = () => {
    return (
        <main>
            <Container>
                <div className="flex items-center justify-center py-32">
                    <div className="max-w-xl bg-filmforge-background-5 p-10 rounded-md flex flex-col gap-8">
                        <div className="flex flex-col items-start gap-2.75">
                            <div>
                                <div className="
                                    text-[11px]
                                    text-filmforge-primary
                                    leading-3.5
                                    tracking-[1.1px]
                                    font-mono
                                    font-semibold
                                    py-1
                                    px-3
                                    bg-filmforge-primary/10
                                ">ACCOUNT CREATED</div>
                            </div>
                            <h1 className="
                                text-[28px]
                                text-filmforge-text
                                leading-7
                                tracking-[-0.7px]
                                font-display
                                font-bold

                            ">COMPLETE YOUR PROFILE</h1>
                            <p className="
                                font-body
                                text-sm
                                text-filmforge-text-4
                                leading-[22.8px]
                                tracking-normal
                            ">Tell filmmakers a little about yourself, what you do, and the kind of work you want to make.</p>
                        </div>

                        <div className="
                            flex 
                            items-center 
                            justify-between border 
                            border-filmforge-primary/50  
                            border-l-filmforge-primary border-l-[6px]
                            p-5 rounded-md
                        ">
                            <div>

                                <div className="">
                                    <h2 className="
                                        font-body
                                        font-semibold
                                        text-filmforge-text
                                        text-[16px]
                                        leading-5.5
                                        tracking-[0.4px]
                                    ">01 — ABOUT YOU</h2>
                                    <p className="
                                        font-body
                                        text-xs
                                        text-filmforge-text-4
                                        leading-4.5
                                        tracking-[0.12px]
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

                    </div>
                </div>
            </Container>
        </main>
    )
}

export default CompleteYourProfileHero