import OnboardingStatus from "./OnboardingStatus";
import OnboardingHeroIntro from "../common/signup-and-onboarding/OnboardingHeroIntro";
import OnboardingFormButton from "../common/signup-and-onboarding/OnboardingFormButton";
import OnboardingRoleCheckBox from "./OnboardingRoleCheckBox";
import Container from "../layout/Container";
import OnboardingOuterCard from "../common/signup-and-onboarding/OnboardingOuterCard";
import { useState, useEffect, type ReactNode, type SubmitEventHandler } from "react";
import { UserRound, Film, Clapperboard, PenTool, AudioLines, KeyboardMusic, ListMusic, NotepadText, Video } from "lucide-react";
import requestFunction from "../../api";
import { rolesSchema } from "../../schemas/profile.schema";
import { zodvalidationError } from "../../utils/validationErrors";
import SignupFormError from "../signup/SignupFormError";
import { useNavigate } from "react-router";
import { ApiError } from "../../errors/ApiError";

type Role = {
    id:string,
    name:string,
}

const iconClassNameText = "text-filmforge-text-4 h-3.75 w-3.75 group-hover:text-filmforge-primary "

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

    const [errors, setErrors] = useState({
        roleIds: "",
        general: ""
    });

    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const navigate = useNavigate();

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
                console.log(data.roles)
                setRoles(data.roles);

            } catch (error) {
                console.log("Fetch failed", error)
                setErrors({
                    roleIds: "",
                    general: "Failed to fetch roles. Please try again."
                })
            }
        }  
        fetchRoles();
    }, [])

    const handleRoleTrigger = (roleId:string) => {
        if(selectedRoles.includes(roleId)){
            setSelectedRoles((prevRoles) => {
                return prevRoles.filter((id) => {   
                    return id !== roleId
                })
            })
        }
        else{
            setSelectedRoles((prevRoles) => {
                const prevRolesCopy = [...prevRoles];
                prevRolesCopy.push(roleId);
                return prevRolesCopy
            })
        }
    }


    const handleSubmit:SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        console.log(selectedRoles)
        const result = rolesSchema.safeParse({
            roleIds: selectedRoles
        });

        if(!result.success){
            const zodErrors = zodvalidationError(result.error);
            setErrors({
                roleIds: zodErrors.roleIds || "",
                general: ""
            })
            return;
        }

        const validatedData = result.data

        try {
            const {response, data} = await requestFunction("profile/roles", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(validatedData)
            })

            if(response.status === 201){
                navigate("/complete-profile/portfolio");
            }

        } catch (error) {
            if(error instanceof ApiError && error.status === 401){
                setErrors({
                    roleIds: "",
                    general: "",
                })
                return navigate("/login", {state: { message: "Session expired. Please login" }})
            }

            if(error instanceof ApiError && error.status === 400 && error.code === "INVALID_ROLE_IDS"){
                setErrors({
                    roleIds: "One or more roleIds are invalid",
                    general: "",
                })
                return; 
            }

            if(error instanceof ApiError && error.status === 409 && error.code === "ROLES_ALREADY_EXIST"){
                setErrors({
                    roleIds: "",
                    general: "Profile roles for this profile already exist",
                })
                return;
            }

            setErrors({
                roleIds: "",
                general: "Unable to create roles. Please try again"
            })
            console.log("post roles failed", error);
        }


    }

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
                            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8" >
                                <div className="flex flex-col gap-3">
                                    <SignupFormError error={errors.roleIds}/>
                                    <SignupFormError error={errors.general}/>
                                    <div className={`grid grid-cols-2 gap-3 w-full ${roles.length === 0 ? "hidden" : "block"}`}>
                                        {roles.map((role) => {
                                            return <OnboardingRoleCheckBox 
                                                key={role.id}
                                                role={role}
                                                icon={roleIcons[role.name.toLowerCase()]}
                                                onToggle={handleRoleTrigger}
                                                checked={selectedRoles.includes(role.id) ? true : false}
                                            />
                                        })}
                                    </div>
                                </div>
                                <div className={`${roles.length === 0 ? "hidden" : "block"} flex flex-col`}>
                                    <OnboardingFormButton text="CONTINUE TO PORTFOLIO"/>
                                </div>
                            </form>
                        </OnboardingOuterCard>
                    </div>
                </div>
            </Container>
        </main>
    )
}

export default OnboardingRolesHero