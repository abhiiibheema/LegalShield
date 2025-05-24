import { z } from "zod";

const user = z.object({
    firstname : z.string(),
    lastname: z.string(),
    username : z.string().min(6).max(10),
    password: z.string().min(6).max(10),
})

const questionAnswer = z.object({
  Question : z.string(),
  Answer : z.string()
})

export type User = z.infer<typeof user>;
export type QandA = z.infer<typeof questionAnswer>
export { User as userType };