import { z } from 'zod'

const usernameErrorValidator = (error: object) => z.object({ username: z.array(z.string()) }).safeParse(error).success
const emailErrorValidator = (error: object) => z.object({ email: z.array(z.string()) }).safeParse(error).success
const passwordErrorValidator = (error: object) => z.object({ password: z.array(z.string()) }).safeParse(error).success

export { usernameErrorValidator, emailErrorValidator, passwordErrorValidator }
