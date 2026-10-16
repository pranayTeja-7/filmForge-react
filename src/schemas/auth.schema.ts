import z from "zod";


export const signupSchema = z.object({
    email: z.email({
        error: "Invalid email address"
    }).trim().toLowerCase(),
    password: z.string().min(8,{error: "Password must contain atleast 8 characters"}).regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).*$/,
        "Password must contain an uppercase letter, a lowercase letter, a number, and a special character"
    ),
    confirmPassword: z.string()
})

export const loginSchema = z.object({
    email: z.email().trim().toLowerCase(),
    password: z.string()
})
