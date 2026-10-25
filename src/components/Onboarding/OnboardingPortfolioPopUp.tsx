import OnboardingOuterCard from "../common/signup-and-onboarding/OnboardingOuterCard"
import OnboardingHeroIntro from "../common/signup-and-onboarding/OnboardingHeroIntro"
import { useEffect, useState, type SubmitEventHandler } from "react"
import requestFunction from "../../api"
import { zodvalidationError } from "../../utils/validationErrors"
import { portfolioItemSchema } from "../../schemas/profile.schema"
import { ApiError } from "../../errors/ApiError"
import { useNavigate } from "react-router"
import type { itemData } from "./OnboardingPortfolioHero"
import SignupFormError from "../signup/SignupFormError"
import { ChevronDown } from "lucide-react"

type onboardingPortfolioPopUpProps = {
    closeModel: () => void,
    addPortfolioItem: (data:itemData) => void,
    removePortfolioItem: (data:itemData) => void,
    updatePortfolioItem: (data:itemData, updatedData:itemData) => void,
    modalType: "create" | "edit",
    item?:itemData,
    setParentError: (error:string) => void,
    setParentResponseMessage: (message:string) => void
}

export const portfolioItemTypes = [
    'SHORT_FILM',
    'FEATURE_FILM',
    'DOCUMENTARY',
    'MUSIC_VIDEO',
    'COMMERCIAL',
    'WEB_SERIES',
    'SHORT_VIDEO',
    'PHOTOGRAPHY',
    'SHOWREEL',
    'OTHER'
]

const OnboardingPortfolioPopUp = (props:onboardingPortfolioPopUpProps) => {

    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        title: "",
        type: "",
        customType: "",
        description: "",
        externalUrl: "",
        general: ""
    })
    const [itemData, setItemData] = useState({
        id: props.item?.id || "",
        title: props.item?.title || "",
        type: props.item?.type || "",
        customType: props.item?.customType || "",
        description: props.item?.description || "",
        externalUrl: props.item?.externalUrl || "", 
    })

    useEffect(() => {
        setItemData({
            id: props.item?.id || "",
            title: props.item?.title || "",
            type: props.item?.type || "",
            customType: props.item?.customType || "",
            description: props.item?.description || "",
            externalUrl: props.item?.externalUrl || "", 
        })
    }, [props.item])
    const handleSubmit:SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const result = portfolioItemSchema.safeParse({
            ...itemData,
            customType: itemData.type === "OTHER" ? itemData.customType : undefined
        })

        if(!result.success) {
            const zodErrors = zodvalidationError(result.error);

            setErrors({
                title: zodErrors.title || "",
                type: zodErrors.type || "",
                customType: zodErrors.customType || "",
                description: zodErrors.description || "",
                externalUrl: zodErrors.externalUrl || "", 
                general: ""
            })
            console.log(result.error.issues)
            return;
        }

        const validatedData = result.data
            console.log("Form data:", itemData);
            console.log("Validation result:", result);

        try {
            const {response, data} = await requestFunction("profile/portfolio-item", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(validatedData)
            })

            if(response.status === 201){
                props.addPortfolioItem(data.portfolioItem);
                setItemData({
                    id:"",
                    title: "",
                    type: "",
                    customType: "",
                    description: "",
                    externalUrl: "", 
                })
                props.closeModel()
            }
            
        } catch (error) {
            console.log(2)
            if(error instanceof ApiError && error.status === 401){
                setErrors({
                    title: "",
                    type: "",
                    customType: "",
                    description: "",
                    externalUrl: "",
                    general: ""
                })
                return navigate("/login", {state: {message: "Session expired. Please login"}});
            }

            if(error instanceof ApiError && error.status === 404 && error.code === "PROFILE_NOT_FOUND"){
                setErrors({
                    title: "",
                    type: "",
                    customType: "",
                    description: "",
                    externalUrl: "",
                    general: ""
                })
                return navigate("/complete-profile/about-you", {state: {message: "Profile not found. Please complete the about you step first"}})
            }

            if(error instanceof ApiError && error.status === 409 && error.code === "INVALID_ONBOARDING_STATUS"){
                setErrors({
                    title: "",
                    type: "",
                    customType: "",
                    description: "",
                    externalUrl: "",
                    general: ""
                })
                return navigate("/complete-profile/your-roles", {state: {message: "Please complete the roles step before managing portfolio"}})
            } 

            if(error instanceof ApiError && error.status === 409 && error.code === "MAXIMUM_PORTFOLIO_ITEMS_LIMIT_REACHED"){
                setErrors({
                    title: "",
                    type: "",
                    customType: "",
                    description: "",
                    externalUrl: "",
                    general: "Maximum portfolio items limit has been reached."
                })
                return
            }

            setErrors({
                title: "",
                type: "",
                customType: "",
                description: "",
                externalUrl: "",
                general: "Something has gone wrong. Please try again"
            })

            console.log("Creating portfolio item failed", error)
        }
    }

    const handleEdit:SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const result = portfolioItemSchema.safeParse({
            ...itemData,
            customType: itemData.type === "OTHER" ? itemData.customType : undefined
        })

        if(!result.success){
            const zodErrors = zodvalidationError(result.error);
            setErrors({
                title: zodErrors.title || "",
                type: zodErrors.type || "",
                customType: zodErrors.customType || "",
                description: zodErrors.description || "",
                externalUrl: zodErrors.externalUrl || "",
                general: ""
            })
            return;
        }

        const validatedData = result.data

        try {
            const {response, data} = await requestFunction(`profile/portfolio-item/${itemData.id}`, {
                method: "put",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(validatedData)
            })

            if(response.status === 200){
                props.updatePortfolioItem(itemData, data.updatedPortfolioItem)
                props.setParentResponseMessage("Portfolio item updated successfully")
                props.closeModel()
            }
        } catch (error) {
            if(error instanceof ApiError && error.status === 401){
                setErrors({
                    title: "",
                    type: "",
                    customType: "",
                    description: "",
                    externalUrl: "",
                    general: ""
                })
                return navigate("/login", {state: {message: "Session expired. Please login"}});
            }

            if(error instanceof ApiError && error.status === 404 && error.code === "PROFILE_NOT_FOUND"){
                setErrors({
                    title: "",
                    type: "",
                    customType: "",
                    description: "",
                    externalUrl: "",
                    general: ""
                })
                return navigate("/complete-profile/about-you", {state: {message: "Profile not found. Please complete the about you step first"}})
            }
            
            if(error instanceof ApiError && error.status === 404 && error.code === "PORTFOLIO_ITEM_NOT_FOUND"){
                setErrors({
                    title: "",
                    type: "",
                    customType: "",
                    description: "",
                    externalUrl: "",
                    general: ""
                })
                if(props.item){
                    props.removePortfolioItem(props.item)
                }
                props.closeModel();
                props.setParentError("The portfolio item no longer exists. It may have been deleted already.")
                return
            }

            setErrors({
                title: "",
                type: "",
                customType: "",
                description: "",
                externalUrl: "",
                general: "Something went wrong. Please try again",
            })
            
            console.log("Update failed", error)
        }
    }

    return (
        <OnboardingOuterCard maxWidthClass="max-w-lg w-full">
            <OnboardingHeroIntro 
                label={props.modalType === "create" ? "ADD PORTFOLIO ITEM" : "EDIT PORTFOLIO ITEM"}
                title={props.modalType === "create" ? "ADD YOUR WORK" : "EDIT YOUR WORK"}
                description={props.modalType === "create" ? "Add a project or piece of work you'd like to showcase on your profile." : "Update the details of your work"}
            />
            <form onSubmit={props.modalType === "create" ? handleSubmit : handleEdit} className="w-full flex flex-col gap-6 " >
                <div className="flex flex-col-reverse gap-2">
                    <div className="flex flex-col gap-2">
                        <SignupFormError error={errors.general} />
                        <SignupFormError error={errors.title} />
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
                        <SignupFormError error={errors.type}/>
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
                        <div className="relative hover:cursor-pointer   ">
                            <ChevronDown size={18} className="
                                    absolute top-1/2 right-4.5
                                    -translate-y-1/2
                                    text-filmforge-text
                                    z-10
                                "/>
                            <select 
                                required
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
                                    px-4 py-3.5
                                    bg-filmforge-background-6
                                    border border-filmforge-stroke-secondary
                                    rounded-md
                                    text-filmforge-text
                                    w-full
                                    appearance-none
                                    focus-visible:border-filmforge-primary/50
                                    focus:border-filmforge-primary/50
                                    relative
                                    hover:cursor-pointer
                                "
                            >   
                                
                                <option value="" disabled className="
                                    font-display
                                    text-sm text-filmforge-text/80
                                leading-5 tracking-normal
                                ">Select work type</option>
                                {portfolioItemTypes.map((type) => {
                                    return (
                                        <option value={type} key={type} className="
                                            font-display
                                            text-sm text-filmforge-text/80
                                            leading-5 tracking-normal
                                        ">{type}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className={`
                    flex flex-col-reverse gap-2
                    ${itemData.type === "OTHER" ? "block" : "hidden"}    
                `}>
                    <div className="flex flex-col gap-2">
                        <SignupFormError error={errors.customType} />
                        <div className="flex items-center justify-between">
                            <label htmlFor="customType" className="
                                text-xs filmforge-400:text-sm
                                text-filmforge-label
                                font-mono
                                leading-4
                                tracking-[0.6px]
                                font-semibold
                            ">CUSTOM TYPE</label>
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
                            required = {itemData.type === "OTHER"}
                            type="text"
                            name="customType" 
                            id="customType" 
                            value={itemData.customType}
                            onChange={(event) => {
                                setItemData((prev) => {
                                    return {
                                        ...prev,
                                        customType: prev.type === "OTHER" ? event.target.value : "",
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
                        <SignupFormError error={errors.description} />
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
                        <SignupFormError error={errors.externalUrl} />
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
                    ">{props.modalType === "create" ? "ADD TO PORTFOLIO" : "SAVE CHANGES"}</button>
                </div>
            </form>
        </OnboardingOuterCard>
    )
}

export default OnboardingPortfolioPopUp