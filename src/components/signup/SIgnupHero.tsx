import OnboardingOuterCard from "../common/signup-and-onboarding/OnboardingOuterCard"
import OnboardingHeroIntro from "../common/signup-and-onboarding/OnboardingHeroIntro"
import Container from "../layout/Container"
import SignupFormError from "./SignupFormError"
import { zodvalidationError } from "../../utils/validationErrors"
import { signupSchema } from "../../schemas/auth.schema"
import { ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react"
import { Link } from "react-router"
import type { SubmitEventHandler } from "react"
import { useState } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react"
import AuthContext from "../../AuthContext"


const SignupHero = () => {

    const auth = useContext(AuthContext);

    if(!auth){
        throw new Error("Signup page must be inside auth provider");
    }

    const {retryAuth} = auth

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        general: ""
    })

    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);

    const navigate = useNavigate();
    const sumbmitMethod:SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const result = signupSchema.safeParse({email, password, confirmPassword});

        if(!result.success){
            const zodErrors = zodvalidationError(result.error);

            setErrors({
                email: zodErrors.email || "",
                password: zodErrors.password || "",
                confirmPassword: zodErrors.confirmPassword || "",
                general: ""
            })
            return;
        }

        const validatedData = result.data;
        
        try {
            const response = await fetch("http://localhost:3000/auth/signup", {
                method: "post",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(validatedData)
            })
    
            const data = await response.json()
                if(!response.ok){ 
                console.log(data)
                
                if(data.code === "EMAIL_ALREADY_EXISTS"){
                    setErrors({
                        email: "An account with this email address already exists. Try logging in instead.",
                        password: "",
                        confirmPassword: "",
                        general: ""
                    })
                    return;
                }

                if(data.code === "VALIDATION_ERROR"){
                    setErrors({
                        email: "",
                        password: "",
                        confirmPassword: "",
                        general: data.details[0].message
                    })
                    return;
                }

                setErrors({
                    email: "",
                    password: "",
                    confirmPassword: "",
                    general: "Something went wrong while creating your account. Please try again."
                })

                console.log("Signup failed", {
                    status: response.status,
                    code: data?.code,
                    message: data?.message
                })
                return;
            }

            if(response.ok === true){
                await retryAuth();
                console.log("setting auth state")
                navigate("/complete-profile");
            }  

        } catch (error) {
            console.log(error);
            setErrors({
                email: "",
                password: "",
                confirmPassword: "",
                general: "Unable to connect. Please try again."
            })
            return;
        }
    }

    return (
        <main className="bg-filmforge-background py-5 filmforge-400:py-8 flex-1 flex flex-col justify-center">
            <Container>
                <div className="flex justify-center items-center">
                    <OnboardingOuterCard maxWidthClass="max-w-120">
                        <OnboardingHeroIntro 
                            label="FILMMAKER ONBOARDING"
                            title="CREATE YOUR ACCOUNT"
                            description="Build your filmmaker profile and discover collaborators."
                        />
                        <form action="" onSubmit={sumbmitMethod} className="
                            flex
                            flex-col
                            gap-5
                            w-full
                        ">
                            <div className="flex flex-col gap-2">
                                <SignupFormError error={errors.general}/>
                                <div className="flex items-center justify-between ">
                                    <label htmlFor="email" className="
                                        text-xs filmforge-400:text-sm
                                        text-filmforge-label
                                        font-mono
                                        leading-4
                                        tracking-[0.6px]
                                        font-semibold
                                    ">EMAIL ADDRESS</label>
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
                                    type="email"
                                    name="email" 
                                    id="email" 
                                    value={email}
                                    onChange={(event) => {setEmail(event.target.value)}}
                                    placeholder="director@filmforge.org"
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
                                <SignupFormError error={errors.email} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between ">
                                    <label htmlFor="password" className="
                                        text-xs filmforge-400:text-sm
                                        text-filmforge-label
                                        font-mono
                                        leading-4
                                        tracking-[0.6px]
                                        font-semibold
                                    ">PASSWORD</label>
                                    <div className="
                                        text-[10px]
                                        text-filmforge-placeholder
                                        font-mono
                                        font-semibold
                                        leading-3.75
                                        tracking-[0.5px]
                                        py-0.5
                                        px-1.5
                                    ">MIN. 8 CHARACTERS</div>
                                </div>
                                <div className="relative">
                                    <input 
                                        required
                                        type={passwordVisibility ? "text" : "password"}
                                        name="password" 
                                        id="password" 
                                        value={password}
                                        onChange={(event) => {setPassword(event.target.value)}}
                                        placeholder="password"
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
                                    <button 
                                        type="button" 
                                        className={`
                                            absolute right-4 top-1/2 
                                            -translate-y-1/2
                                            hover:cursor-pointer
                                            ${password ? "block" : "hidden"}
                                        `} 
                                        onClick={() => {setPasswordVisibility((prev) => !prev)}}
                                    >
                                        {
                                            passwordVisibility ? <EyeOff size={18} className="text-filmforge-placeholder"/> : <Eye size={18} className="text-filmforge-placeholder"/>
                                        }
                                    </button>
                                </div>
                                <SignupFormError error={errors.password}/>
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between ">
                                    <label htmlFor="confirmPassword" className="
                                        text-xs filmforge-400:text-sm
                                        text-filmforge-label
                                        font-mono
                                        leading-4
                                        tracking-[0.6px]
                                        font-semibold
                                    ">CONFIRM PASSWORD</label>
                                    <div className="
                                        text-[10px]
                                        text-filmforge-text-4
                                        font-mono
                                        font-semibold
                                        leading-3.75
                                        tracking-[0.5px]
                                        bg-filmforge-background-6
                                        border border-filmforge-stroke-secondary
                                        rounded-xs
                                        py-0.5
                                        px-1.5
                                    ">CONFIRMATION</div>
                                </div>
                                <div className="relative">
                                    <input 
                                        required
                                        type={confirmPasswordVisibility ? "text" : "password"}
                                        name="confirmPassword" 
                                        id="confirmPassword" 
                                        value={confirmPassword}
                                        onChange={(event) => {setConfirmPassword(event.target.value)}}
                                        placeholder="confirm password"
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
                                    <button 
                                        type="button" 
                                        className={`
                                            absolute right-4 top-1/2 
                                            -translate-y-1/2
                                            hover:cursor-pointer
                                            ${confirmPassword ? "block" : "hidden"}
                                        `} 
                                        onClick={() => {setConfirmPasswordVisibility((prev) => !prev)}}
                                    >
                                        {
                                            confirmPasswordVisibility ? <EyeOff size={18} className="text-filmforge-placeholder"/> : <Eye size={18} className="text-filmforge-placeholder"/>
                                        }
                                    </button>
                                </div>
                                <SignupFormError error={errors.confirmPassword}/>
                            </div>
                            <button className="
                                font-display
                                font-semibold
                                text-xs filmforge-400:text-sm
                                text-filmforge-background
                                bg-filmforge-primary
                                leading-5
                                tracking-[0.7px]
                                flex
                                items-center
                                justify-center
                                gap-1
                                py-3.5
                                rounded-md
                                hover:cursor-pointer
                            "><span>CREATE YOUR ACCOUNT</span> <ArrowRight className="h-4.5 w-4.5 self-start"/></button>
                            <div className="flex items-start gap-2 p-3 bg-filmforge-background-6 border border-filmforge-stroke-secondary">
                                <ShieldCheck className="
                                    w-6 h-5
                                    text-filmforge-primary
                                    
                                "/>
                                <p className="
                                    text-xs
                                    leading-4.75
                                    tracking-normal
                                    text-filmforge-text-4
                                ">
                                    Next, add your filmmaking disciplines and portfolio to help collaborators discover your work.
                                </p>
                            </div>
                        </form>
                        <div className="
                            flex
                            justify-center
                            items-end
                            gap-2
                            border-t
                            border-filmforge-stroke-secondary
                            w-full
                            pt-5
                        ">
                            <div className="
                                font-body
                                text-xs
                                leading-4
                                tracking-normal
                                text-filmforge-text-4
                            ">Already registered on FilmForge?</div>
                            <Link to={"/login"} className="
                                text-filmforge-primary
                                text-xs
                                leading-4
                                tracking-[0.6px]
                                font-mono
                                whitespace-nowrap
                            ">LOG IN</Link>
                        </div>
                    </OnboardingOuterCard>
                </div>
            </Container>
        </main>
    )
}

export default SignupHero