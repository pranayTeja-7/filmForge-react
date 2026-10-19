import type { ReactNode } from "react"
import { Check } from "lucide-react"
import { useState } from "react"

type OnboadingRoleCheckBoxPropsType = {
    role:string,
    icon:ReactNode
}


const OnboardingRoleCheckBox = (props:OnboadingRoleCheckBoxPropsType) => {

const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

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
            "
        >
            <div className="flex gap-3 items-center ">
                <div className="p-2 border border-filmforge-stroke-secondary bg-filmforge-background-5">{props.icon}</div>
                <label htmlFor={props.role.toLowerCase()} className="
                    font-body
                    font-medium
                    text-filmforge-text
                    text-sm
                    leading-5
                    tracking-[0.35px]
                ">{props.role}</label>
            </div>
            <input
                type="checkbox" 
                name={props.role.toLowerCase()} 
                id={props.role.toLowerCase()} 
                className={`
                    w-5 h-5
                    appearance-none
                    bg-filmforge-background-5
                    border border-filmforge-stroke-secondary
                `}
            />
        </div>
    )
}


export default OnboardingRoleCheckBox