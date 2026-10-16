type OnboadingIntroProps = {
    label: string
    title: string,
    description: string
}

const OnboardingHeroIntro = (props:OnboadingIntroProps) => {
    return (
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
                    
                ">{props.label}</div>
            </div>
            <h1 className="
                font-display
                font-bold
                text-2xl filmforge-400:text-3xl
                text-filmforge-text
                leading-9
                tracking-[-0.75px]

            ">{props.title}</h1>
            <p className="
                font-body
                text-[13px] filmforge-400:text-sm
                text-filmforge-text-secondary
                leading-[22.8px]
                tracking-normal
            ">{props.description}</p>
        </div>
    )
}


export default OnboardingHeroIntro