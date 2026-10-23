import { ArrowRight } from "lucide-react"
type OnboardingFormButtonProps = {
    text:string
}

const OnboardingFormButton = (props:OnboardingFormButtonProps) => {
    return (
        <button className="
            font-display
            font-semibold
            text-[11.5px] filmforge-400:text-sm
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
            w-full
        " type="submit">
            <span>{props.text}</span> 
            <ArrowRight className="h-4.5 w-4.5 self-start hidden filmforge-400:block"/>
        </button>
    )
}


export default OnboardingFormButton