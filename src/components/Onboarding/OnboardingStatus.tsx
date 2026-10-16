import { Check } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

type onboardingStatusProp= {
    status : "aboutYou" | "yourRoles" | "portfolio"
};



const OnboardingStatus = (props:onboardingStatusProp) => {
    const statuses = ["aboutYou", "yourRoles", "portfolio"] as const;
    const current = statuses.indexOf(props.status) + 1;
    const statusTexts = ["ABOUT YOU", "YOUR ROLES", "PORTFOLIO"] ;

    const getStatusData = (statusId:number) => {
        if(current === statusId){
            return {
                numberColor : "text-filmforge-background",
                numberDisplay : "block",
                numberBorder : "border-filmforge-primary",
                numberBg : "bg-filmforge-primary",
                textColor : "text-filmforge-primary",
                checkDisplay : "hidden",
            }
        }
        else if(current > statusId){
            return {
                numberColor : "text-filmforge-background",
                numberDisplay : "hidden",
                numberBorder : "border-filmforge-primary",
                numberBg : "bg-filmforge-primary",
                textColor : "text-filmforge-text",
                checkDisplay : "block"
            }
        }
        else {
            return {
                numberColor : "text-filmforge-text-4",
                numberDisplay : "block",
                numberBorder : "border-filmforge-stroke-secondary",
                numberBg : "transparent",
                textColor : "text-filmforge-text-4",
                checkDisplay : "hidden",
            }
        }
    }

    const statusData = {
        aboutYou : {
            data: getStatusData(1)
        },
        yourRoles : {
            data: getStatusData(2)
        },
        portfolio : {
            data: getStatusData(3),
        }
    }

     
    
    return (
        <div className="items-center gap-3 hidden filmforge-400:flex">
            {
                statuses.map((status, idx) => {
                    return (
                        <Fragment key={status}>
                            <div className="
                                flex
                                items-center
                                gap-2
                            ">  
                                <div className={`
                                    border border-filmforge-stroke-secondary
                                    w-8 h-8
                                    rounded-[50%]
                                    flex
                                    items-center justify-center
                                    ${statusData[status].data.checkDisplay}
                                `}>
                                    <Check className={`
                                        text-filmforge-primary
                                        w-3.5 h-3.5
                                    `}/>
                                </div>
                                <div className={`
                                    text-[11px]
                                    ${statusData[status].data.numberColor}
                                    leading-4
                                    tracking-normal
                                    ${statusData[status].data.numberBg}
                                    w-8 h-8
                                    rounded-[50%]
                                    font-mono
                                    font-semibold
                                    border ${statusData[status].data.numberBorder}
                                    ${statusData[status].data.numberDisplay}
                                    flex items-center justify-center
                                `}>{idx + 1}</div>
                                <div className={`
                                    text-[11px]
                                    ${statusData[status].data.textColor}
                                    leading-4
                                    tracking-[0.55px]
                                    font-mono
                                    font-semibold
                                `}>{`0${idx + 1} ${statusTexts[idx]}`}</div>
                            </div>
                            
                            <div className={`
                                h-0.5 flex-1
                                ${(current > idx + 1) ? "bg-filmforge-primary" : "bg-filmforge-stroke-secondary"}
                                ${(idx === statuses.length - 1) ? "hidden" : "block"}
                            `}></div>
                    
                        </Fragment>                      
                    )
                })
            }
            
        </div>
    )
}


export default OnboardingStatus