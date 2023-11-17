import { useState } from 'react'

type TEditFormStates = {
    userName: string
    fullName: string
    email: string
    currentPassword: string
    newPassword: string
    repeatPassword: string
    enableUsername: boolean
    enableFullName: boolean
    enableEmail: boolean
    enablePassword: boolean
}

type TEditFormSetters = {
    setUserName: (userName: string) => void
    setFullName: (fullName: string) => void
    setEmail: (email: string) => void
    setCurrentPassword: (currentPassword: string) => void
    setNewPassword: (newPassword: string) => void
    setRepeatPassword: (repeatPassword: string) => void
    setEnableUsername: (enableUsername: boolean) => void
    setEnableFullName: (enableFullName: boolean) => void
    setEnableEmail: (enableEmail: boolean) => void
    setEnablePassword: (enablePassword: boolean) => void
}

function useUserEditForm(): { states: TEditFormStates, setters: TEditFormSetters } {
    const [userName, setUserName] = useState<string>("")
    const [fullName, setFullName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [currentPassword, setCurrentPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [repeatPassword, setRepeatPassword] = useState<string>("")
    const [enableUsername, setEnableUsername] = useState<boolean>(false)
    const [enableFullName, setEnableFullName] = useState<boolean>(false)
    const [enableEmail, setEnableEmail] = useState<boolean>(false)
    const [enablePassword, setEnablePassword] = useState<boolean>(false)

    return {
        states: {
            userName,
            fullName,
            email,
            currentPassword,
            newPassword,
            repeatPassword,
            enableUsername,
            enableFullName,
            enableEmail,
            enablePassword,
        },
        setters: {
            setUserName,
            setFullName,
            setEmail,
            setCurrentPassword,
            setNewPassword,
            setRepeatPassword,
            setEnableUsername,
            setEnableFullName,
            setEnableEmail,
            setEnablePassword,
        }
    }
}

export default useUserEditForm
export type { TEditFormSetters, TEditFormStates }
