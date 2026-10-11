import Container from "../layout/Container"
import SignupFormError from "./SignupFormError"
import { ArrowRight } from "lucide-react"
import { ShieldCheck } from "lucide-react"
import { Link } from "react-router"
import type { SubmitEventHandler } from "react"
import { useState } from "react"
import { useNavigate } from "react-router"

const SignupHero = () => {

    const [emailError, setEmailError] = useState("") 
    const [passwordError, setPasswordError] = useState("") 
    const [confirmPasswordError, setConfrimPasswordError] = useState("") 
    const [generalError, setGeneralError] = useState("")
    const navigate = useNavigate();
    const sumbmitMethod:SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        setEmailError("")

        setGeneralError("")
       
        setPasswordError("")

        setConfrimPasswordError("");

        const email = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString()
        const confirmPassword = formData.get("confirmPassword")?.toString();
         

        if(!(email && password && confirmPassword)){
            setGeneralError("Please fill all the fields")
            return;
        }

        if(!(
            password.length >= 8 &&
            /[A-Z]/.test(password) && 
            /[a-z]/.test(password) && 
            /[0-9]/.test(password) && 
            /[^A-Za-z0-9]/.test(password)
        )){
            setPasswordError("Password is too weak. Must contain at least 8 characters, including an uppercase letter, lowercase letter, number and a symbol.")
            return;
        }

        if(password !== confirmPassword){
            console.log("passwords do not match");
            setConfrimPasswordError("Passwords do not match")
            return;
        }

        const response = await fetch("http://localhost:3000/auth/signup", {
            method: "post",
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify({
                email,
                password,
                confirmPassword
            })
        })

        const data = await response.json()

        if(response.ok === false){ 
            if(data.code === "EMAIL_ALREADY_EXISTS"){
                setEmailError("An account with this email address already exists. Try logging in instead.");
                return;
            }
            setGeneralError(data.message);
            return;
        }

        if(response.ok === true){
            navigate("/complete-profile");
        }

        console.log(response)
        console.log(data)
    }

    return (
        <main className="bg-filmforge-background py-8   ">
            <Container>
                <div className="flex justify-center items-center">
                    <div className="
                        p-5 filmforge-400:p-8 
                        flex 
                        flex-col 
                        gap-5.5  filmforge-400:gap-8
                        items-start
                        justify-center 
                        bg-filmforge-background-5 
                        rounded-md border 
                        border-filmforge-stroke-secondary
                        max-w-120
                    ">
                        <div className="flex flex-col gap-2 items-start">
                            <div className="
                                flex 
                                items-center
                                px-3
                                py-1
                                rounded-xl
                                bg-filmforge-background-secondary
                                w-fit
                                gap-1.75
                            ">
                                <div className="w-1.5 h-1.5 bg-filmforge-primary rounded-[50%]"></div>
                                <div className="
                                    font-mono
                                    text-[10px]
                                    leading-5
                                    tracking-[1px]
                                    font-medium
                                    text-filmforge-primary
                                    
                                ">FILMMAKER ONBOARDING</div>
                            </div>
                            <h1 className="
                                font-display
                                font-bold
                                text-2xl filmforge-400:text-3xl
                                text-filmforge-text
                                leading-9
                                tracking-[-0.75px]

                            ">CREATE YOUR ACCOUNT</h1>
                            <p className="
                                font-body
                                text-[13px] filmforge-400:text-sm
                                text-filmforge-text-secondary
                                leading-[22.8px]
                                tracking-normal
                            ">Build your filmmaker profile and discover collaborators.</p>
                        </div>
                        <form action="" onSubmit={sumbmitMethod} className="
                            flex
                            flex-col
                            gap-5
                            w-full
                        ">
                            <div className="flex flex-col gap-2">
                                <SignupFormError error={generalError}/>
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
                                <SignupFormError error={emailError} />
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
                                <input 
                                    type="password"
                                    name="password" 
                                    id="password" 
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
                                <SignupFormError error={passwordError}/>
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
                                <input 
                                    type="password"
                                    name="confirmPassword" 
                                    id="confirmPassword" 
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
                                <SignupFormError error={confirmPasswordError}/>
                            </div>
                            <button className="
                                font-display
                                font-semibold
                                text-sm
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
                            "><span>GET STARTED</span> <ArrowRight className="h-4.5 w-4.5 self-start"/></button>
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
                    </div>
                </div>

            </Container>
        </main>
    )
}

export default SignupHero