import z from "zod"

export const zodvalidationError = (errors:z.ZodError):Record<string, string> => {
    const zodErrors:Record<string, string> = {}

    for(const issue of errors.issues){
        const field = issue.path[0];
        const message = issue.message;
        if(typeof field === "string" && !(field in zodErrors)){
            zodErrors[field] = message
        }
    }

    return zodErrors;
}