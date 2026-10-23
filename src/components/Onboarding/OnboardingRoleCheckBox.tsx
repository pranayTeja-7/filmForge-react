import type { ReactNode } from "react"
import { Check } from "lucide-react"

type OnboadingRoleCheckBoxPropsType = {
    role:{id:string, name:string},
    icon:ReactNode,
    checked:boolean
    onToggle: (roleId:string) => void
}


const OnboardingRoleCheckBox = (props:OnboadingRoleCheckBoxPropsType) => {

    
    return (
        <label 
            htmlFor={props.role.name.toLowerCase()}
            className={`
                ${props.checked ? "bg-filmforge-primary/10" : "bg-filmforge-background-6"}
                p-3 filmforge-400:p-4
                flex
                justify-between
                items-center
                rounded-md
                border-2 border-filmforge-stroke-secondary
                group
                hover:cursor-pointer
                hover:border-filmforge-primary/50
            `}
        >
            <div className="flex gap-3 items-center ">
                <div className="
                    p-2 
                    rounded-md
                    border-2 border-filmforge-stroke-secondary 
                    bg-filmforge-background-5
                    group-hover:border-filmforge-primary/50
                    
                ">{props.icon}</div>
                <div  className="
                    font-body
                    font-medium
                    text-filmforge-text
                    text-sm filmforge-400:text-[16px] sm:text-sm
                    leading-5
                    tracking-[0.35px]
                ">{props.role.name}</div>
            </div>
            <div className="relative w-6 h-6">
                <div className={`
                        absolute top-0 left-0 
                        w-6 h-6
                        border-2 border-filmforge-stroke-secondary
                        group-hover:border-filmforge-primary/50
                        ${props.checked ? "bg-filmforge-primary " : "bg-filmforge-background-6"}
                        rounded-md
                        flex justify-center items-center
                    `}>
                    <Check size={18} className={`font-body ${props.checked ? "block" : "hidden"} text-filmforge-background`}/>
                </div>
                <input
                    checked={props.checked}
                    onChange={() => {props.onToggle(props.role.id)}}
                    type="checkbox" 
                    name={props.role.name.toLowerCase()} 
                    id={props.role.name.toLowerCase()} 
                    className={`
                        hover:cursor-pointer
                        appearance-none
                        w-6 h-6
                    `} 
                />
            </div>
        </label>
    )
}


export default OnboardingRoleCheckBox