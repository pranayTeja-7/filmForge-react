type LandingProcessStepCard = {
    step:number, 
    label:string, 
    title:string, 
    descreption:string, 
    keywords:string
}

const LandingProcessStepCard = (
    {
        step, 
        label,
        title,
        descreption,
        keywords,
    }:LandingProcessStepCard
) => {
    return (
        <div className="
            flex
            flex-col
            bg-filmforge-background-tertiary
            p-5
            sm:p-6
            gap-4
            rounded-lg
            flex-1
        ">
            <div className="
                flex
                justify-between
                items-center
                font-mono
                pb-3
                border-b border-b-filmforge-stroke/30
            ">
                <div className="text-xs text-filmforge-primary leading-4 tracking-[0.6px]">STEP 0{step}</div>
                <div className="text-[10px] text-filmforge-text-tertiary leading-2.5 tracking-[0.5px]">{label}</div>
            </div>
            <h3 className="
                font-display
                text-[22px]
                leading-7
                font-semibold
                tracking-normal
                text-filmforge-text
            ">{title}</h3>
            <p className="
                text-[15px] lg:text-sm
                font-body
                leading-[22.8px]
                tracking-normal
                text-filmforge-text-secondary
            ">{descreption}</p>
            <div className="
                flex
                justify-start
                items-center
                gap-2
                text-[11px]
                leading-5
                tracking-normal
                font-mono
                text-filmforge-text-tertiary
                
                sm:pt-3
                mt-2
            "><span className="w-1 h-1 rounded-[50%] block bg-filmforge-primary"></span> {keywords}</div>
        </div>
    )
}

export default LandingProcessStepCard