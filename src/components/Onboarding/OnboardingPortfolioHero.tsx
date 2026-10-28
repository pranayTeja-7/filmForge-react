import OnboardingOuterCard from "../common/signup-and-onboarding/OnboardingOuterCard";
import OnboardingStatus from "./OnboardingStatus";
import Container from "../layout/Container";
import OnboardingHeroIntro from "../common/signup-and-onboarding/OnboardingHeroIntro";
import OnboardingPortfolioItemsList from "./OnboardingPortfolioItemsList";
import { Clapperboard, Plus } from "lucide-react";
import OnboardingFormButton from "../common/signup-and-onboarding/OnboardingFormButton";
import OnboardingPortfolioPopUp from "./OnboardingPortfolioPopUp";
import { useState, useEffect } from "react";
import requestFunction from "../../api";
import { ApiError } from "../../errors/ApiError";
import { useNavigate } from "react-router";
import SignupFormError from "../signup/SignupFormError";
import ResponseMessage from "../common/signup-and-onboarding/ResponseMessage";
import AuthContext from "../../AuthContext";
import { useContext } from "react";



export type itemData = {
    id:string,
    title:string,
    type:string,
    customType:string|null,
    description:string|null
    externalUrl:string|null,
}

const OnboardingPortfolioHero = () => {

    const auth = useContext(AuthContext);

    if(!auth){
        throw new Error("Onboarding/portfolio page must be inside auth provider");
    }

    const {retryAuth} = auth

    const navigate = useNavigate()

    const [portfolioItems, setPortfolioItems] = useState<itemData[]>([]);
    
    const [errors, setErrors] = useState({
        general: ""
    })

    const [messages, setMessages] = useState({
        general: ""
    })

    const [modalType, setModalType] = useState<"create"|"edit" >("create")
    const [modalDisplay, setModalDisplay] = useState("hidden")

    const [itemData, setItemData] = useState<itemData | undefined>(undefined)

    const closeModal = () => {
        setModalDisplay("hidden")
    }

    const setParentErrorCallback = (error:string) => {
        setErrors({
            general: error
        })
    }

    const setParentResponseMessageCallback = (message:string) => {
        setMessages({
            general: message
        })
    }

    const openModal = () => {
        setModalDisplay("block")
    }

    const changeModalTypeToEdit = () => {
        setModalType("edit")
    }

    const changeModalTypeToCreate = () => {
        setModalType("create");
    }

    const addPortfolioItemDataToModal = (data:itemData) => {
        setItemData(data);
    }

    const removePortfolioItemDataFromModal = () => {
        setItemData(undefined)
    }

    const addPortfolioItem = (data:itemData) => {
        setPortfolioItems((prev) => {
            const prevCopy = [...prev];
            prevCopy.push(data);
            return prevCopy
        });
    }

    const removePortfolioItem = (data:itemData) => {
        setPortfolioItems((prev) => {
            const updatedlist = prev.filter((item) => {
                return item.id !== data.id
            })
            return updatedlist
        })
    }

    const updatePortfolioItem = (data:itemData, updatedData:itemData) => {
        setPortfolioItems((prev) => {
            const prevCopy = [...prev];
            prevCopy.forEach((item, idx) => {
                if(item.id === data.id){
                    prevCopy[idx] = updatedData;
                }
                return;
            })
            return prevCopy
        })
    }
    
    const handleFinishProfile = async () => {
        try {
            const {response} = await requestFunction("profile/complete-profile", {
                method: "post"
            })

            if(response.status === 200){
                setErrors({
                    general: ""
                })
                await retryAuth();
                return navigate("/")
            }

        } catch (error) {
            if(error instanceof ApiError && error.status === 401){
                setErrors({
                    general: ""
                });
                return navigate("/login", {state: {message: "Session expired. Please login"}})
            }

            if(error instanceof ApiError && error.status === 404 && error.code === "PROFILE_NOT_FOUND"){
                setErrors({
                    general: ""
                });
                return navigate("/complete-profile/about-you", {state: {message: "Profile not found. Please complete the about you step first"}})
            }

            if(error instanceof ApiError && error.status === 409 && error.code === "INVALID_ONBOARDING_STATUS"){
                setErrors({
                    general: ""
                });
                return navigate("/complete-profile/your-roles", {state: {message: "Please complete the roles step."}})
            }

            setErrors({
                general: "Something went wrong. Please try again"
            });

            console.log("Profile status update failed", error);
            
        }
    }  

    useEffect(() => {
        const getPortfolioItems = async () => {
            try {
                const { response, data } = await requestFunction("profile/portfolio-items", {
                    method: "get"
                })

                if(response.status === 200){
                    setPortfolioItems(data.portfolioItems)
                }
            } catch (error) {
                if(error instanceof ApiError && error.status === 401){
                    setErrors({
                        general: ""
                    });
                   return navigate("/login", {state: {message: "Session expired. Please login"}});
                }

                if(error instanceof ApiError && error.status === 404 && error.code === "PROFILE_NOT_FOUND"){
                    setErrors({
                        general: "",
                    })
                   return navigate("/complete-profile/about-you", {state: {message: "Profile not found. Please complete the about you step first"}});
                }

                if(error instanceof ApiError && error.status === 403 && error.code === "ROLES_REQUIRED"){
                    setErrors({
                        general: ""
                    })
                   return navigate("/complete-profile/your-roles", {state: {message: "Please complete the roles step before managing portfolio"}})
                }

                setErrors({
                    general: "Unable to connect please try again"
                })

                console.log("fetch items error", error);
            }
        }

        getPortfolioItems();

    },[]);

    useEffect(() => {
        if(!messages.general){
            return;
        }

        const timer = setTimeout(() => {
            setMessages({general: ""})
        }, 4000)

        return () => {clearTimeout(timer)}
    }, [messages]);

    return (

        
        <main className="bg-filmforge-background py-5 filmforge-400:py-8 flex-1 flex flex-col justify-center">
            <Container>
                <div className="flex flex-col items-center w-full">
                    <div className="flex flex-col gap-8 max-w-180 w-full">
                        <OnboardingStatus status="portfolio"/>
                        <OnboardingOuterCard maxWidthClass="w-full">
                            <OnboardingHeroIntro 
                                label="STEP 03 · PORTFOLIO"
                                title="SHOWCASE YOUR WORK"
                                description="
                                    Add a few projects or pieces of work you'd like other filmmakers to see. You
                                    can always add more later.
                                "
                            />
                            <SignupFormError error={errors.general}/>
                            <ResponseMessage message={messages.general}/>
                            <div className={`
                                flex flex-col 
                                items-center gap-3 
                                w-full
                                bg-filmforge-background-6 
                                rounded-md
                                border-2 border-dashed border-filmforge-stroke-secondary
                                py-6 filmforge-400:py-7 sm:py-12 
                                px-2.5 sm:px-8
                                hover:border-filmforge-primary/50
                                ${(portfolioItems.length === 0) ? "block" : "hidden"}
                            `}>
                                <div className="
                                    p-4
                                    bg-filmforge-background-5
                                    rounded-md
                                    border border-filmforge-stroke-secondary
                                ">
                                    <Clapperboard size={23} className="text-filmforge-primary"/>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <div className="
                                        font-body font-semibold
                                        text-sm filmforge-400:text-[16px] 
                                        text-filmforge-text
                                        leading-5.5
                                        tracking-[0.4px]
                                        text-center
                                    ">NO PORTFOLIO ITEMS YET</div>
                                    <p className="
                                        font-body 
                                        text-[10px] filmforge-400:text-xs 
                                        text-filmforge-text-4
                                        leading-4 filmforge-400:leading-4.5
                                        text-center
                                        tracking-[0.12px]
                                    "
                                    >Add your first piece of work to start building your portfolio.</p>
                                </div>
                                <button onClick={() => {
                                    changeModalTypeToCreate();
                                    setItemData(undefined)
                                    setModalDisplay("block")
                                }} className="
                                    py-3.25
                                    px-5
                                    bg-filmforge-background-5
                                    border-2 border-filmforge-stroke-secondary
                                    rounded-md
                                    flex items-center gap-1.5
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
                                    ">ADD PORTFOLIO ITEM</div>
                                </button>
                            </div>

                            <div className="w-full">
                                <OnboardingPortfolioItemsList 
                                    portfolioItems={portfolioItems}
                                    openModel={openModal}
                                    removePortfolioItem={removePortfolioItem}
                                    changeModalTypeToEdit={changeModalTypeToEdit}
                                    changeModalTypeToCreate={changeModalTypeToCreate}
                                    addPortfolioItemDataToModal={addPortfolioItemDataToModal}
                                    removePortfolioItemDataFromModel={removePortfolioItemDataFromModal}
                                />
                            </div>

                            <div className="flex flex-col gap-2.5 items-center w-full">
                                <div className="w-full" onClick={handleFinishProfile}>
                                    <OnboardingFormButton text="FINISH PROFILE"/>
                                </div>
                                <button type="button" onClick={handleFinishProfile} className={`
                                    font-medium font-mono
                                    text-filmforge-text-4
                                    text-[11px]
                                    leading-3.5
                                    tracking-[1.1px]
                                    hover:text-filmforge-text
                                    ${portfolioItems.length === 0 ? "block" : "hidden"}
                                `}>SKIP FOR NOW</button>
                            </div>
                        </OnboardingOuterCard>
                    </div>
                </div>
                <div className={`
                    flex 
                    flex-col 
                    items-center 
                    justify-center
                    w-full
                    fixed
                    inset-0
                    h-full
                    bg-black/80
                    ${modalDisplay}
                `}>
                    <OnboardingPortfolioPopUp 
                        closeModel={closeModal}
                        addPortfolioItem={addPortfolioItem}
                        modalType={modalType}
                        item={itemData}
                        setParentError={setParentErrorCallback}
                        setParentResponseMessage={setParentResponseMessageCallback}
                        removePortfolioItem={removePortfolioItem}
                        updatePortfolioItem={updatePortfolioItem}
                    />
                </div>
            </Container>
        </main>
    )
}


export default OnboardingPortfolioHero