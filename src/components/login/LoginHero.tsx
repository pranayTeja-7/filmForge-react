import OnboardingOuterCard from "../common/signup-and-onboarding/OnboardingOuterCard"
import OnboardingHeroIntro from "../common/signup-and-onboarding/OnboardingHeroIntro"
import Container from "../layout/Container"
import OnboardingFormButton from "../common/signup-and-onboarding/OnboardingFormButton"
import { Link } from "react-router"
import { ArrowUpRight, LockKeyhole, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"
import type { SubmitEventHandler } from "react"
import { loginSchema } from "../../schemas/auth.schema"
import { zodvalidationError } from "../../utils/validationErrors"
import SignupFormError from "../signup/SignupFormError"


const LoginHero = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        general: ""
    })

    const navigate = useNavigate();

    const handleSubmit:SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const result = loginSchema.safeParse({email, password})

        if(!result.success){
            const zodErrors = zodvalidationError(result.error);
            setErrors({
                email: zodErrors.email || "",
                password: zodErrors.password || "",
                general: ""
            })
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/auth/login",{
                method: "post",
                credentials: "include",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            
            const data = await response.json();

            if(!response.ok){
                if(data.code === "INVALID_CREDENTIALS"){
                    setErrors({
                        email: "",
                        password: "",
                        general: "Invalid credentials."
                    })
                    return;
                }

                setErrors({
                    email: "",
                    password: "",
                    general: "Login failed. Please try again"
                })

                console.log("Login failed", {
                    status: response.status,
                    code: data?.code,
                    message: data?.message
                })
                return;
            }

            if(response.ok === true){
                setErrors({
                    email: "",
                    password: "",
                    general: ""
                })
                navigate("/");
            }

        } catch (error) {
            console.log(error);
            setErrors({
                email: "",
                password: "",
                general: "Unable to connect. Please try again"
            })
            return;
        }

    }

    return (
        <main className="bg-filmforge-background py-5 filmforge-400:py-8 flex-1 flex flex-col justify-center">
            <Container>
                <div className="flex flex-col justify-center  items-center">
                    <OnboardingOuterCard maxWidthClass="max-w-xl w-full">
                        <OnboardingHeroIntro 
                            label="FILMMAKER ACCESS"
                            title="WELCOME BACK"
                            description="Pick up where your next story begins"
                        />
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5" >
                            <div className="flex flex-col gap-2">
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
                                    type="email"
                                    name="email" 
                                    id="email" 
                                    required
                                    value={email}
                                    onChange={(event) => {setEmail(event.target.value)}}
                                    placeholder="director@filmforge.org"
                                    autoComplete="username"
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
                                <SignupFormError error={errors.email}/>
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
                                <div className="relative">
                                    <input 
                                        type={passwordVisibility ? "text" : "password"}
                                        required
                                        name="password" 
                                        id="password" 
                                        value={password}
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                        }}
                                        placeholder="Password"
                                        autoComplete="current-password"
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
                                    <button type="button" onClick={() => {setPasswordVisibility((prev) => !prev)}} className={`
                                        absolute right-3 top-1/2 -translate-y-1/2
                                        hover:cursor-pointer
                                        ${password ? "block" : "hidden"}
                                    `} aria-label={passwordVisibility ? "Hide password" : "Show password"}>
                                        {passwordVisibility ? <EyeOff size={18} className="text-filmforge-placeholder"/> : <Eye size={18} className="text-filmforge-placeholder"/>}
                                    </button>
                                </div>
                                <SignupFormError error={errors.password}/>
                            </div>     
                            <div className="flex flex-col gap-2.5">
                                <OnboardingFormButton text="LOG IN"/>   
                                <SignupFormError error={errors.general}/>
                            </div>
                            <div className="flex justify-center items-center gap-2 filmforge-400:gap-3">
                                <div className="
                                    font-body
                                    text-[13px] filmforge-400:text-sm
                                    text-filmforge-text-secondary
                                    leading-[22.8px]
                                    tracking-normal
                                    text-center
                                    hidden filmforge-400:block
                                ">New to FilmForge?</div>
                                <Link to={"/signup"} className="flex items-center">
                                    <div className=" 
                                        font-mono
                                        font-medium
                                        text-filmforge-primary
                                        text-[11px]
                                        leading-3.5
                                        tracking-[1.1px]
                                        text-center
                                    ">CREATE AN ACCOUNT</div>
                                    <ArrowUpRight size={18} className="text-filmforge-primary " />
                                </Link>
                            </div>          
                            <div className="flex gap-2 items-center p-3 bg-filmforge-background-6 border border-filmforge-stroke-secondary">
                                <div className="p-2 bg-filmforge-background-5">
                                    <LockKeyhole className="
                                        w-5 h-5
                                        text-filmforge-primary
                                    "/>
                                </div>
                                <p className="
                                    text-xs
                                    leading-4.75
                                    tracking-normal
                                    text-filmforge-text-4
                                ">
                                    Encrypted filmmaker authentication. Seamless access to your projects and collaborations.
                                </p>
                            </div>             
                        </form>                        
                    </OnboardingOuterCard>

                </div>
            </Container>
        </main>
    )
}


export default LoginHero