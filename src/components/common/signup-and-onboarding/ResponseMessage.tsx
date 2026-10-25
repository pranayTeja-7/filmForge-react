import { CheckCircle } from "lucide-react"


type errorProps = {
    message:string
}

const ResponseMessage = (props:errorProps) => {
    if(!props.message){
        return null;
    }
    return (
        <div className="
            text-filmforge-success
            flex
            items-center
            gap-1.5
        ">
            <CheckCircle className="text-sm h-5 w-5 shrink-0" />
            <p className="
                text-xs
                leading-4
                tracking-normal
                font-mono
            ">{props.message}</p>
        </div>
    )
}


export default ResponseMessage