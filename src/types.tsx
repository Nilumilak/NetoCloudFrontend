import type { z } from 'zod'

import type { fileSchema, fileStateSchema } from './validators/fileValidator'
import type { storageSchema, storageStateSchema } from './validators/storageValidator'
import type { accessTokenSchema, tokenSchema, tokenStateSchema } from './validators/tokenValidator'
import type { userSchema, usersListSchema, usersListStateSchema, userStateSchema } from './validators/userValidator'

type TToken = z.infer<typeof tokenSchema>
type TAccessToken = z.infer<typeof accessTokenSchema>
type TTokenState = z.infer<typeof tokenStateSchema>
type TUser = z.infer<typeof userSchema>
type TUserState = z.infer<typeof userStateSchema>
type TUsersList = z.infer<typeof usersListSchema>
type TUsersListState = z.infer<typeof usersListStateSchema>
type TFile = z.infer<typeof fileSchema>
type TFileState = z.infer<typeof fileStateSchema>
type TStorage = z.infer<typeof storageSchema>
type TStorageState = z.infer<typeof storageStateSchema>

export type { TAccessToken, TFile, TFileState, TStorage, TStorageState, TToken, TTokenState, TUser, TUsersList, TUsersListState, TUserState }
