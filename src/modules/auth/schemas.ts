import { z } from "zod";

export const registerSchema= z.object({
    email: z.string().email(),
    password: z.string().min(8,'Password must be at least 8 characters long'),
    username: z.string()
        .min(3,'Username must be at least 3 characters long')
        .max(63,'Username must be at most 63 characters long')
        .regex(/^[a-z][a-z0-9._$!-]*[a-z0-9]$/,'username must start with a letter and end with a letter or number')
        .refine((val)=>!val.includes("--"),'username must not contain "--"')
        .transform((val)=> val.toLowerCase())
        
})
        