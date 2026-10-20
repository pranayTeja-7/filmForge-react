import type { ReactNode } from "react"
import { Check } from "lucide-react"
import { useState } from "react"

type OnboadingRoleCheckBoxPropsType = {
    role:{id:string, name:string},
    icon:ReactNode,
    checked:boolean
    onToggle: (roleId:string) => void
}


const OnboardingRoleCheckBox = (props:OnboadingRoleCheckBoxPropsType) => {


    return (
        <div 
            className="
                bg-filmforge-background-6
                p-4
                flex
                justify-between
                items-center
                rounded-md
                border border-filmforge-stroke-secondary
                hover:cursor-pointer
            "
            onClick={() => {props.onToggle(props.role.id)}}
        >
            <div className="flex gap-3 items-center ">
                <div className="p-2 border border-filmforge-stroke-secondary bg-filmforge-background-5">{props.icon}</div>
                <label htmlFor={props.role.name.toLowerCase()} className="
                    font-body
                    font-medium
                    text-filmforge-text
                    text-sm
                    leading-5
                    tracking-[0.35px]
                ">{props.role.name}</label>
            </div>
            <input
                checked={props.checked}
                type="checkbox" 
                name={props.role.name.toLowerCase()} 
                id={props.role.name.toLowerCase()} 
                className={`
                    w-5 h-5
                    hover:cursor-pointer
                `}
                
            />
        </div>
    )
}


export default OnboardingRoleCheckBox