type TitleClassProps = {
    size:"landingHeader"|"footer"|"signupHeader"
} 

const titleClasses = {
    landingHeader: "text-sm sm:text-[22px]",
    footer: "text-sm",
    signupHeader: "text-lg"
}



const TitleLogo = (props:TitleClassProps) => {
    return (
        <div className="">
            <a href="" className={`
                    font-display 
                    font-extrabold 
                    ${titleClasses[props.size]}
                    text-filmforge-text
                    tracking-[1.1px] 
                    leading-7
                `}>
                FILM<span className="text-filmforge-primary">FORGE</span>
            </a>
        </div>
    )
}

export default TitleLogo