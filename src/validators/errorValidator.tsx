import { z } from 'zod'

const usernameErrorValidator = (error: object): boolean => z.object({ username: z.array(z.string()) }).safeParse(error).success
const emailErrorValidator = (error: object): boolean => z.object({ email: z.array(z.string()) }).safeParse(error).success
const passwordErrorValidator = (error: object): boolean => z.object({ password: z.array(z.string()) }).safeParse(error).success

export { emailErrorValidator, passwordErrorValidator, usernameErrorValidator }
