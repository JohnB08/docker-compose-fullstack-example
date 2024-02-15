import { SetStateAction } from "react"

export type LogInProps = {
    setActiveUser: SetStateAction<any>
}

export type ValidData = {
    message: string
    user: {
        username: string
        password: string
        token: string
        tokenkey: string
        datecreated: string
        saltrounds: number
    }
}