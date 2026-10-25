import requestFunction from "../../api"
import { ApiError } from "../../errors/ApiError"
import SignupFormError from "../signup/SignupFormError"
import ResponseMessage from "../common/signup-and-onboarding/ResponseMessage"
import type { itemData } from "./OnboardingPortfolioHero"
import { Pencil, Trash, Plus, Link2, MoveUpRight } from "lucide-react"
import { useNavigate } from "react-router"
import { useState, useEffect } from "react"

type OnboardingPortfolioItemsListPropsType = {
    portfolioItems:itemData[]
    openModel:() => void
    removePortfolioItem:(data:itemData) => void
    changeModalTypeToEdit:() => void
    changeModalTypeToCreate:() => void
    addPortfolioItemDataToModal:(data:itemData) => void
    removePortfolioItemDataFromModel:() => void
}

const OnboardingPortfolioItemsList = (props:OnboardingPortfolioItemsListPropsType) => {

    const navigate = useNavigate()

    const [errors, setErrors] = useState({
        general: ""
    })
    
    const [messages, setMessages] = useState({
        general: ""
    }) 

    

    useEffect(() => {
        if(!messages.general){
            return;
        }

        const timer = setTimeout(() => {
            setMessages({general: ""})
        }, 4000)

        return () => {clearTimeout(timer)}
    }, [messages])


    const handleDelete = async (item:itemData) => {
        try {
            const {response, data} = await requestFunction(`profile/portfolio-item/${item.id}`, {
                method: "delete",
            })

            if(response.status === 200){
                props.removePortfolioItem(item);
                    setMessages({
                    general: "Portfolio item deleted successfully"
                })
            }
            

        } catch (error) {
            if(error instanceof ApiError && error.status === 401){
                setErrors({
                    general: ""
                })
                return navigate("/login", {state: {message: "Session expired. Please login"}})
            }
            if(error instanceof ApiError && error.status === 404 && error.code === "PROFILE_NOT_FOUND"){
                setErrors({
                    general: ""
                });
                return navigate("/complete-profile/about-you", {state: {message: "Profile not found. Please complete the about you step first"}})
            }
            if(error instanceof ApiError && error.status === 404 && error.code === "PORTFOLIO_ITEM_NOT_FOUND"){
                props.removePortfolioItem(item)
                setErrors({
                    general: "The portfolio item does'nt exist. It might have been deleted already"
                });
                return;
            }

            setErrors({
                general: "Something went wrong. Please try again"
            });

            console.log("Delete failed", error)
        }
    }

    const handleEdit = (data:itemData) => {
        console.log(1)
        props.changeModalTypeToEdit();
        props.openModel();
        props.addPortfolioItemDataToModal(data)
        console.log(data)
    }

    return (
        <div className="flex flex-col gap-5 ">
            <ResponseMessage message={messages.general}/>
            <SignupFormError error={errors.general}/>
            {
                props.portfolioItems.map((item) => {
                    return (
                        <div key={item.id} className="
                            w-full 
                            p-5
                            bg-filmforge-background-6
                            border border-filmforge-stroke-secondary
                            rounded-md
                            hover:border-filmforge-primary/50
                            flex flex-col gap-3
                        ">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h2 className="
                                        font-display font-bold
                                        text-[22px] text-filmforge-text
                                        leading-7 tracking-normal
                                    ">{item.title.toUpperCase()}</h2>
                                    <div className="
                                        font-mono font-medium
                                        text-filmforge-primary text-[11px]
                                        leading-3.5 tracking-[0.55px]
                                        bg-filmforge-background-5 
                                        border border-filmforge-stroke-secondary
                                        py-0.5 px-2
                                        rounded-md
                                    ">{(item.type === "OTHER" ? item.customType : item.type)}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => {handleEdit(item)}} className="
                                        flex items-center gap-4 
                                        px-2 py-1 
                                        text-filmforge-text-4
                                        hover:cursor-pointer
                                        hover:text-filmforge-text
                                        hover:bg-filmforge-background/40
                                        rounded-md
                                    ">
                                        <Pencil size={11} />
                                        <div className="
                                            font-mono font-medium
                                            text-[11px] 
                                            leading-3.5 tracking-[0.66px]
                                        ">Edit</div>
                                    </button>
                                    <button onClick={() => {handleDelete(item)}} className="
                                        flex items-center gap-4 
                                        px-2 py-1 
                                        text-filmforge-text-4
                                        hover:cursor-pointer
                                        hover:text-filmforge-error
                                        hover:bg-filmforge-background/40
                                        rounded-md
                                    ">
                                        <Trash size={11} />
                                        <div className="
                                            font-mono font-medium
                                            text-[11px] 
                                            leading-3.5 tracking-[0.66px]
                                        ">Delete</div>
                                    </button>
                                </div>
                            </div>

                            <p className="
                                text-filmforge-text-4 text-sm
                                font-body
                                leading-5 tracking-normal
                            ">{item.description}</p>
                            <a 
                                href={item.externalUrl ? item.externalUrl : undefined} 
                                target="_blank" rel="noopener noreferrer" 
                                className="
                                flex items-center gap-1.5
                                font-mono
                                text-xs text-filmforge-text-4
                                leading-4.5 tracking-[0.12px]
                                px-2.5 py-1
                                rounded-md
                                bg-filmforge-background-5
                                border border-filmforge-stroke-secondary
                                w-fit
                            ">
                                <Link2 size={18}/>
                                <div>External link</div>
                                <MoveUpRight size={18}/>
                            </a>
                        </div>
                    )
                })
            }
            <button onClick={() => {
                props.removePortfolioItemDataFromModel(),
                props.changeModalTypeToCreate()
                props.openModel()
            }} className="
                w-full
                py-3.25
                bg-filmforge-background-5
                border-2 border-filmforge-stroke-secondary
                rounded-md
                flex items-center gap-1.5 justify-center
                font-display font-semibold
                hover:cursor-pointer
                hover:border-filmforge-primary/50
            ">
                <Plus size={15} className="text-filmforge-text"/>
                <div className="
                    text-[10px] filmforge-400:text-xs 
                    text-filmforge-text
                    leading-4
                    tracking-[0.6px]
                ">ADD ANOTHER ITEM</div>
            </button>
        </div>
    )
}


export default OnboardingPortfolioItemsList
