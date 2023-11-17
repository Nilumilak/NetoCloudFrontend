import { z } from 'zod'
import { tokenSchema, tokenStateSchema, accessTokenSchema } from "./validators/tokenValidator";
import { userSchema, userStateSchema } from './validators/userValidator';
import { fileSchema, fileStateSchema } from './validators/fileValidator';
import { storageSchema, storageStateSchema } from './validators/storageValidator';

type TToken = z.infer<typeof tokenSchema>
type TAccessToken = z.infer<typeof accessTokenSchema>
type TTokenState = z.infer<typeof tokenStateSchema>
type TUser = z.infer<typeof userSchema>
type TUserState = z.infer<typeof userStateSchema>
type TFile = z.infer<typeof fileSchema>
type TFileState = z.infer<typeof fileStateSchema>
type TStorage = z.infer<typeof storageSchema>
type TStorageState = z.infer<typeof storageStateSchema>

export type { TToken, TUser, TUserState, TFile, TFileState, TStorage, TStorageState, TTokenState, TAccessToken }
