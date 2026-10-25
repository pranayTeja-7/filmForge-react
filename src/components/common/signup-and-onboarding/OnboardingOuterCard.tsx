import type { ReactNode } from "react";

type OnboardingOuterCardProps = {
    children:ReactNode,
    maxWidthClass:string
}
const OnboardingOuterCard = (props:OnboardingOuterCardProps) => {
    return (
        <div className={`
            p-4 filmforge-400:p-6 sm:p-8
            flex 
            flex-col 
            gap-5.5  filmforge-400:gap-6
            items-start
            justify-center 
            bg-filmforge-background-5 
            rounded-md border 
            border-filmforge-stroke-secondary
            ${props.maxWidthClass}
        `}> 

            {props.children}
        </div>
    )
}


export default OnboardingOuterCard