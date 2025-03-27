import { PropsWithChildren, useState } from "react"
import { AuthContext } from "./AuthContext"

export default function Auth(props: PropsWithChildren) {

    const JWT_KEY_NAME = 'sn.shaharsol.jwt'

    const [ jwt, setJwt ] = useState<string>(localStorage.getItem(JWT_KEY_NAME) || '')

    const { children } = props

    function newLogin(jwt: string) {
        setJwt(jwt)
        localStorage.setItem(JWT_KEY_NAME, jwt)
    }

    function logout() {
        setJwt('')
        localStorage.removeItem(JWT_KEY_NAME)
    }

    return (
        <AuthContext.Provider value={{jwt, newLogin, logout}}>
            {children}
        </AuthContext.Provider>
    )
}