import OnboardingStatus from "./OnboardingStatus";
import OnboardingHeroIntro from "../common/signup-and-onboarding/OnboardingHeroIntro";
import OnboardingFormButton from "../common/signup-and-onboarding/OnboardingFormButton";
import OnboardingRoleCheckBox from "./OnboardingRoleCheckBox";
import Container from "../layout/Container";
import OnboardingOuterCard from "../common/signup-and-onboarding/OnboardingOuterCard";
import { useState, useEffect, type ReactNode } from "react";
import { UserRound, Film, Clapperboard, PenTool, AudioLines, KeyboardMusic, ListMusic, NotepadText, Video } from "lucide-react";

type Role = {
    id:string,
    name:string,
}

const iconClassNameText = "text-filmforge-text-4 h-3.75 w-3.75"

const roleIcons:Record<string, ReactNode> = {
    director: <Clapperboard className={iconClassNameText}/>,
    writer: <PenTool className={iconClassNameText}/>,
    cinematographer: <Video className={iconClassNameText}/>,
    editor: <Film className={iconClassNameText}/>,
    "music director": <ListMusic className={iconClassNameText}/>,
    composer: <KeyboardMusic className={iconClassNameText}/>,
    "sound designer": <AudioLines className={iconClassNameText}/>,
    producer: <NotepadText className={iconClassNameText}/>,
    actor: <UserRound className={iconClassNameText}/>
}

const OnboardingRolesHero = () => {

    const [error, setError] = useState("");
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        const fetchRoles = async() => {
            try {
                const response = await fetch("http://localhost:3000/roles",{
                    method: "get",
                    credentials: "include"
                });

                if(!response.ok){
                    throw new Error(`HTTP: ${response.status}`)
                }

                const data = await response.json();
                
                setRoles(data.roles);

            } catch (error) {
                console.log("Fetch failed", error)
                setError("Failed to fetch roles. Please try again.")
            }
        }  
        fetchRoles();
    })
    return(
        <main className="bg-filmforge-background py-5 filmforge-400:py-8 flex-1 flex flex-col justify-center">
            <Container>
                <div className="flex flex-col items-center w-full">
                    <div className="flex flex-col gap-8 max-w-155 w-full">
                        <OnboardingStatus status="yourRoles"/>
                        <OnboardingOuterCard maxWidthClass="w-full">
                            <OnboardingHeroIntro 
                                label="STEP 02 · YOUR ROLES"
                                title="WHAT DO YOU DO ON A FILM?"
                                description="
                                    Choose the roles that best describe what you bring to a project. You can select
                                    more than one.
                                "
                            />
                            <form action="" className="w-full flex flex-col gap-6 " >
                                <div className="grid grid-cols-2 gap-3 w-full">
                                    {roles.map((role) => {
                                        return <OnboardingRoleCheckBox 
                                            key={role.id}
                                            role={role.name}
                                            icon={roleIcons[role.name.toLowerCase()]}
                                        />
                                    })}
                                </div>
                                <OnboardingFormButton text="CONTINUE TO PORTFOLIO"/>
                            </form>
                        </OnboardingOuterCard>
                    </div>
                </div>
            </Container>
        </main>
    )
}

export default OnboardingRolesHero