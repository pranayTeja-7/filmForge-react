import OnboardingOuterCard from "../common/signup-and-onboarding/OnboardingOuterCard"
import OnboardingHeroIntro from "../common/signup-and-onboarding/OnboardingHeroIntro"
import { useState } from "react"

type onboardingPortfolioPopUpProps = {
    closeModel: () => void
}

const OnboardingPortfolioPopUp = (props:onboardingPortfolioPopUpProps) => {

    const [itemData, setItemData] = useState({
        title: "",
        type: "",
        description: "",
        externalUrl: "" 
    })

    return (
        <OnboardingOuterCard maxWidthClass="max-w-xl">
            <OnboardingHeroIntro 
                label="ADD PORTFOLIO ITEM"
                title="ADD YOUR WORK"
                description="Add a project or piece of work you'd like to showcase on your profile."
            />
            <form className="w-full flex flex-col gap-6 " >
                <div className="flex flex-col-reverse gap-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between ">
                            <label htmlFor="title" className="
                                text-xs filmforge-400:text-sm
                                text-filmforge-label
                                font-mono
                                leading-4
                                tracking-[0.6px]
                                font-semibold
                            ">TITLE</label>
                            <div className="
                                text-[10px]
                                text-filmforge-background-7
                                font-mono
                                font-semibold
                                leading-3.75
                                tracking-[0.5px]
                                bg-filmforge-background-7/10
                                border border-filmforge-background-7/20
                                rounded-xs
                                py-0.5
                                px-1.5
                            ">REQUIRED</div>
                        </div>
                        <input 
                            required
                            type="text"
                            name="title" 
                            id="title" 
                            value={itemData.title}
                            onChange={(event) => {
                                setItemData((prev) => {
                                    return {
                                        ...prev,
                                        title: event.target.value,
                                    }
                                })
                            }}
                            placeholder="Project or work title"
                            className="
                                placeholder:text-xs filmforge-400:placeholder:text-sm
                                placeholder:tracking-normal
                                placeholder:text-filmforge-placeholder
                                placeholder:font-body
                                px-4 py-3.5
                                bg-filmforge-background-6
                                border border-filmforge-stroke-secondary
                                rounded-md
                                text-filmforge-text
                                w-full
                            "
                        />
                    </div>
                </div>
                <div className="flex flex-col-reverse gap-2">    
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between ">
                            <label htmlFor="type" className="
                                text-xs filmforge-400:text-sm
                                text-filmforge-label
                                font-mono
                                leading-4
                                tracking-[0.6px]
                                font-semibold
                            ">type</label>
                            <div className="
                                text-[10px]
                                text-filmforge-background-7
                                font-mono
                                font-semibold
                                leading-3.75
                                tracking-[0.5px]
                                bg-filmforge-background-7/10
                                border border-filmforge-background-7/20
                                rounded-xs
                                py-0.5
                                px-1.5
                            ">REQUIRED</div>
                        </div>
                        <select 
                            name="type" 
                            id="type" 
                            value={itemData.type}
                            onChange={(event) => {
                                setItemData((prev) => {
                                    return {
                                        ...prev,
                                        type: event.target.value,
                                    }
                                })
                            }}
                            className="
                                placeholder:text-xs filmforge-400:placeholder:text-sm
                                placeholder:tracking-normal
                                placeholder:text-filmforge-placeholder
                                placeholder:font-body
                                px-4 py-3.5
                                bg-filmforge-background-6
                                border border-filmforge-stroke-secondary
                                rounded-md
                                text-filmforge-text
                                w-full
                            "
                        >
                            <option value="">test</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col-reverse gap-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between ">
                            <label htmlFor="description" className="
                                text-xs filmforge-400:text-sm
                                text-filmforge-label
                                font-mono
                                leading-4
                                tracking-[0.6px]
                                font-semibold
                            ">DESCRIPTION</label>
                            <div className="
                                text-[10px]
                                text-filmforge-text-4
                                font-mono
                                font-semibold
                                leading-3.75
                                tracking-[0.5px]
                                py-0.5
                                px-1.5
                            ">OPTIONAL</div>
                        </div>
                        <textarea 
                            name="description" 
                            id="description" 
                            value={itemData.description}
                            onChange={(event) => {
                                setItemData((prev) => {
                                    return {
                                        ...prev,
                                        description: event.target.value,
                                    }
                                })
                            }}
                            placeholder="Tell people a little about this work"
                            className="
                                placeholder:text-xs filmforge-400:placeholder:text-sm
                                placeholder:tracking-normal
                                placeholder:text-filmforge-placeholder
                                placeholder:font-body
                                px-4 py-3.5
                                bg-filmforge-background-6
                                border border-filmforge-stroke-secondary
                                rounded-md
                                text-filmforge-text
                                w-full
                            "
                        ></textarea>
                    </div>
                </div>    
                <div className="flex flex-col-reverse gap-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between ">
                            <label htmlFor="externalUrl" className="
                                text-xs filmforge-400:text-sm
                                text-filmforge-label
                                font-mono
                                leading-4
                                tracking-[0.6px]
                                font-semibold
                            ">EXTERNAL URL</label>
                            <div className="
                                text-[10px]
                                text-filmforge-text-4
                                font-mono
                                font-semibold
                                leading-3.75
                                tracking-[0.5px]
                                py-0.5
                                px-1.5
                            ">OPTIONAL</div>
                        </div>
                        <input 
                            type="text"
                            name="externalUrl" 
                            id="externalUrl" 
                            value={itemData.externalUrl}
                            onChange={(event) => {
                                setItemData((prev) => {
                                    return {
                                        ...prev,
                                        externalUrl: event.target.value,
                                    }
                                })
                            }}
                            placeholder="https://..."
                            className="
                                placeholder:text-xs filmforge-400:placeholder:text-sm
                                placeholder:tracking-normal
                                placeholder:text-filmforge-placeholder
                                placeholder:font-body
                                px-4 py-3.5
                                bg-filmforge-background-6
                                border border-filmforge-stroke-secondary
                                rounded-md
                                text-filmforge-text
                                w-full
                            "
                        />
                    </div>
                </div>          
                <div className="flex justify-end gap-1">
                    <button type="button" onClick={props.closeModel} className="
                        font-display font-bold
                        text-xs text-filmforge-text-4
                        hover:text-filmforge-text
                        hover:cursor-pointer
                        px-6 py-3.5
                        leading-4
                        tracking-[0.6px]
                    ">CANCEL</button>
                    <button type="submit" className="
                        font-display font-bold
                        text-xs text-filmforge-background
                        bg-filmforge-primary
                        hover:bg-filmforge-primary/90
                        px-6 py-3.5
                        rounded-sm
                        hover:cursor-pointer
                        leading-4
                        tracking-[0.6px]
                    ">ADD TO PORTFOLIO</button>
                </div>
            </form>
        </OnboardingOuterCard>
    )
}

export default OnboardingPortfolioPopUp