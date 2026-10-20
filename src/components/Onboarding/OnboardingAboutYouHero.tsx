import OnboardingStatus from "./OnboardingStatus"
import OnboardingHeroIntro from "../common/signup-and-onboarding/OnboardingHeroIntro"
import OnboardingFormButton from "../common/signup-and-onboarding/OnboardingFormButton"
import OnboardingOuterCard from "../common/signup-and-onboarding/OnboardingOuterCard"
import Container from "../layout/Container"
import SignupFormError from "../signup/SignupFormError"
import { useState, type SubmitEventHandler } from "react"
import { useNavigate } from "react-router"
import requestFunction from "../../api"
import { zodvalidationError } from "../../utils/validationErrors"
import { profileSchema } from "../../schemas/profile.schema"
import { ApiError } from "../../errors/ApiError"


const OnboardingAboutYouHero = () => {

    const [displayName, setDisplayName] = useState("");
    const [bio, setBio] = useState("");
    const [experience, setExperience] = useState("");
    const [location, setLocation] = useState("");
    const navigate = useNavigate();


    const [errors, setErrors] = useState({
        displayName: "",
        bio: "",
        experience: "",
        location: "",
        general: ""
    })

    const handleSubmit:SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const result = profileSchema.safeParse({
            displayName,
            bio,
            experience,
            location,
        })

        if(!result.success){
            const zodErrors = zodvalidationError(result.error);
            setErrors({
                displayName: zodErrors?.displayName || "",
                bio: zodErrors?.bio || "",
                experience: zodErrors?.experience || "",
                location: zodErrors?.location || "",
                general: ""
            })
            return;
        }

        const body = result.data;

        try {
            const {data, response} = await requestFunction("profile", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(body)
            })

            if(response.status === 201){
                
                setErrors({
                    displayName: "",
                    bio: "",
                    experience: "",
                    location: "",
                    general: ""
                })
                return navigate("/complete-profile/your-roles")
            }
            
        } catch (error) {
            if(error instanceof ApiError && error.status === 401){
                return navigate("/login", {
                    state: {
                        message: "Session expired. Please login"
                    }    
                });
            }
            if(error instanceof ApiError && error.status === 409 && error.code === "PROFILE_ALREADY_EXISTS"){
                setErrors({
                    displayName: "",
                    bio: "",
                    experience: "",
                    location: "",
                    general: "Profile for this user already exists. Please continue with the next onboarding step."
                })
                return
            }
            setErrors({
                displayName: "",
                bio: "",
                experience: "",
                location: "",
                general: "Creating profile failed. Please try again"
            })
            console.log("POST profile failed", error);
        }
    }
    


    return (
        <main className="py-10 bg-filmforge-background flex-1 flex flex-col justify-center">
            <Container>
                <div className="flex justify-center">
                    <div className="max-w-160 w-full flex flex-col gap-8">
                        <OnboardingStatus status="aboutYou"/>
                        <OnboardingOuterCard maxWidthClass="w-full">
                            <OnboardingHeroIntro 
                                label="STEP 01 · ABOUT YOU"
                                title="TELL US ABOUT YOU"
                                description="
                                    Create your filmmaker identity so collaborators know who you are and the
                                    perspective you bring to a production.
                                "
                            />
                            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6" >
                                <div className="flex flex-col-reverse gap-2">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between ">
                                            <label htmlFor="displayName" className="
                                                text-xs filmforge-400:text-sm
                                                text-filmforge-label
                                                font-mono
                                                leading-4
                                                tracking-[0.6px]
                                                font-semibold
                                            ">DISPLAY NAME</label>
                                            <div className="
                                                text-[10px]
                                                text-filmforge-background-7
                                                font-mono
                                                font-semibold
                                                leading-3.75
                                                tracking-[0.5px]
                                                bg-filmforge-background-7/10
                                                border border-filmforge-background-7/20
                                                rounded-xs
                                                py-0.5
                                                px-1.5
                                            ">REQUIRED</div>
                                        </div>
                                        <input 
                                            required
                                            type="text"
                                            name="displayName" 
                                            id="displayName" 
                                            placeholder="How should people know you?"
                                            value={displayName}
                                            onChange={(event) => {setDisplayName(event.target.value)}}
                                            className="
                                                placeholder:text-xs filmforge-400:placeholder:text-sm
                                                placeholder:tracking-normal
                                                placeholder:text-filmforge-placeholder
                                                placeholder:font-body
                                                px-4 py-3.5
                                                bg-filmforge-background-6
                                                border border-filmforge-stroke-secondary
                                                rounded-md
                                                text-filmforge-text
                                                w-full
                                            "
                                        />
                                    </div>
                                    <SignupFormError error={errors.displayName}/>
                                </div>
                                <div className="flex flex-col-reverse gap-2">    
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between ">
                                            <label htmlFor="bio" className="
                                                text-xs filmforge-400:text-sm
                                                text-filmforge-label
                                                font-mono
                                                leading-4
                                                tracking-[0.6px]
                                                font-semibold
                                            ">BIO</label>
                                            <div className="
                                                text-[10px]
                                                text-filmforge-text-4
                                                font-mono
                                                font-semibold
                                                leading-3.75
                                                tracking-[0.5px]
                                                py-0.5
                                                px-1.5
                                            ">OPTIONAL</div>
                                        </div>
                                        <textarea 
                                            name="bio" 
                                            id="bio" 
                                            placeholder="Tell people a little about yourself, your filmmaking interests, or the kind of projects you enjoy."
                                            value={bio}
                                            onChange={(event) => {setBio(event.target.value)}}
                                            className="
                                                placeholder:text-xs filmforge-400:placeholder:text-sm
                                                placeholder:tracking-normal
                                                placeholder:text-filmforge-placeholder
                                                placeholder:font-body
                                                px-4 py-3.5
                                                bg-filmforge-background-6
                                                border border-filmforge-stroke-secondary
                                                rounded-md
                                                text-filmforge-text
                                                w-full
                                            "
                                        ></textarea>
                                    </div>
                                    <SignupFormError error={errors.bio}/>
                                </div>
                                <div className="flex flex-col-reverse gap-2">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between ">
                                            <label htmlFor="experience" className="
                                                text-xs filmforge-400:text-sm
                                                text-filmforge-label
                                                font-mono
                                                leading-4
                                                tracking-[0.6px]
                                                font-semibold
                                            ">EXPERIENCE</label>
                                            <div className="
                                                text-[10px]
                                                text-filmforge-text-4
                                                font-mono
                                                font-semibold
                                                leading-3.75
                                                tracking-[0.5px]
                                                py-0.5
                                                px-1.5
                                            ">OPTIONAL</div>
                                        </div>
                                        <input 
                                            type="text"
                                            name="experience" 
                                            id="experience" 
                                            placeholder="Describe your filmmaking experience, past projects, or skills you've developed"
                                            value={experience}
                                            onChange={(event) => {setExperience(event.target.value)}}
                                            className="
                                                placeholder:text-xs filmforge-400:placeholder:text-sm
                                                placeholder:tracking-normal
                                                placeholder:text-filmforge-placeholder
                                                placeholder:font-body
                                                px-4 py-3.5
                                                bg-filmforge-background-6
                                                border border-filmforge-stroke-secondary
                                                rounded-md
                                                text-filmforge-text
                                                w-full
                                            "
                                        ></input>
                                    </div>
                                    <SignupFormError error={errors.experience}/>
                                </div>    
                                <div className="flex flex-col-reverse gap-2">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between ">
                                            <label htmlFor="location" className="
                                                text-xs filmforge-400:text-sm
                                                text-filmforge-label
                                                font-mono
                                                leading-4
                                                tracking-[0.6px]
                                                font-semibold
                                            ">LOCATION</label>
                                            <div className="
                                                text-[10px]
                                                text-filmforge-text-4
                                                font-mono
                                                font-semibold
                                                leading-3.75
                                                tracking-[0.5px]
                                                py-0.5
                                                px-1.5
                                            ">OPTIONAL</div>
                                        </div>
                                        <input 
                                            type="text"
                                            name="location" 
                                            id="location" 
                                            placeholder="City or region (e.g. Los Angeles, CA)"
                                            value={location}
                                            onChange={(event) => {setLocation(event.target.value)}}
                                            className="
                                                placeholder:text-xs filmforge-400:placeholder:text-sm
                                                placeholder:tracking-normal
                                                placeholder:text-filmforge-placeholder
                                                placeholder:font-body
                                                px-4 py-3.5
                                                bg-filmforge-background-6
                                                border border-filmforge-stroke-secondary
                                                rounded-md
                                                text-filmforge-text
                                                w-full
                                            "
                                        />
                                    </div>
                                    <SignupFormError error={errors.location}/>
                                </div>          
                                <div className="flex flex-col gap-2.5">
                                    <OnboardingFormButton text="CONTINUE TO YOUR ROLES"/>                          
                                    <div className="self-center">
                                        <SignupFormError error={errors.general}/>
                                    </div>
                                </div>
                            </form>
                        </OnboardingOuterCard>
                    </div>
                </div>
            </Container>
        </main>
    )
}

export default OnboardingAboutYouHero