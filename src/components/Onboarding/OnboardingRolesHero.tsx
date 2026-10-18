import OnboardingStatus from "./OnboardingStatus";
import OnboardingHeroIntro from "../common/signup-and-onboarding/OnboardingHeroIntro";
import OnboardingFormButton from "../common/signup-and-onboarding/OnboardingFormButton";
import OnboardingRoleCheckBox from "./OnboardingRoleCheckBox";
import Container from "../layout/Container";
import OnboardingOuterCard from "../common/signup-and-onboarding/OnboardingOuterCard";
import { useState, useEffect } from "react";

type Role = {
    id:string,
    name:string,
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
        <main>
            <Container>
                <div>
                    <OnboardingStatus status="yourRoles"/>
                    <OnboardingOuterCard maxWidthClass="">
                        <OnboardingHeroIntro 
                            label="STEP 02 · YOUR ROLES"
                            title="WHAT DO YOU DO ON A FILM?"
                            description="
                                Choose the roles that best describe what you bring to a project. You can select
                                more than one.
                            "
                        />
                        <form action="">
                                                        
                        </form>
                    </OnboardingOuterCard>
                </div>
            </Container>
        </main>
    )
}