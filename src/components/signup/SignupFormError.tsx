import { CircleAlert } from "lucide-react"


type errorProps = {
    error:string|null,
}

const SignupFormError = (props:errorProps) => {
    if(!props.error){
        return null;
    }
    return (
        <div className="
            text-filmforge-error
            flex
            items-center
            gap-1.5
        ">
            <CircleAlert className="text-sm h-5 w-5 shrink-0" />
            <p className="
                text-xs
                leading-4
                tracking-normal
                font-mono
            ">{props.error}</p>
        </div>
    )
}


export default SignupFormError