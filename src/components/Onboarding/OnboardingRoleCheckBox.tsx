import { useEffect, useState } from "react"
import type { ReactNode } from "react"

type OnboadingRoleCheckBoxPropsType = {
    role:string,
    icon:ReactNode
}

const OnboardingRoleCheckBox = (props:OnboadingRoleCheckBoxPropsType) => {
    return (
        <div className="
            bg-filmforge-background-6
            p-4
        ">
            <div>
                <div className="p-2">{props.icon}</div>
                <label htmlFor={props.role.toLowerCase()} className="
                    font-body
                    font-medium
                    text-filmforge-text
                    text-sm
                    leading-5
                    tracking-[0.35px]
                ">{props.role}</label>
            </div>
            <input type="checkbox" name={props.role.toLowerCase()} id={props.role.toLowerCase()} />
        </div>
    )
}


export default OnboardingRoleCheckBox