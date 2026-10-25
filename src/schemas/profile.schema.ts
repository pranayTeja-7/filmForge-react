import { z } from "zod"
import { portfolioItemTypes } from "../components/Onboarding/OnboardingPortfolioPopUp"

export const profileSchema = z.object({
    displayName: z.string().trim().min(3, {
        error: "Display name should be in between 3-100 characters"
    }).max(100, {
        error: "Display name should be in between 3-100 characters"
    }),
    bio: z.string().trim().max(500, {error: "Bio must contain at most 500 characters"}).optional(),
    experience: z.string().trim().max(500, {error: "Experience must contain at most 500 characters"}).optional(),
    location: z.string().trim().max(100, {error: "Location name must contain at most 100 characters"}).optional(),
})


export const rolesSchema = z.object({
    roleIds: z.array(z.uuid({error: "One or more roleId is invalid"}))
        .min(1, {error: "Select atleast one role"})
        .refine((array) => {
            return new Set(array).size === array.length
        },{
            error: "All roleIds must be unique"
        })
})


export const portfolioItemSchema = z.object({
    title: z.string().trim().min(3, {error: "Title must contain atleast 3 letters"}).max(150, {error :"Title must contain atmost 150 letters"}),
    type: z.enum(portfolioItemTypes),
    customType: z.string().trim().min(3, {error: "Custom type must contain atleast 3 letters"}).max(100 ,{error: "Custom type must contain atmost 100 letters"}).optional(),
    description: z.string().max(1000, {error: "Custom type must contain atmost 1000 letters"}).optional(),
    externalUrl: z.url({error: "Please enter a valid URL"}).max(2048, {error: "Custom type must contain atmost 2048 characters"}).optional()
}).superRefine((data, context) => {
    if(data.type === "OTHER"){
        if(!data.customType?.trim()){
            context.addIssue({
                code: "custom",
                path: ["customType"],
                message: 'Custom type is required when type is "OTHER"'
            })
        }
    }
    else{
        if(data.customType != undefined){
            context.addIssue({
                code: "custom",
                path: ["customType"],
                message: 'Custom type is allowed only when type is "OTHER"'
            })
        }
    }
})