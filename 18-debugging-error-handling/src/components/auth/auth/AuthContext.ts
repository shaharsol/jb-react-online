import { createContext } from "react"

interface AuthContextInterface {
    jwt: string,
    newLogin(jwt: string): void,
    logout(): void
}

export const AuthContext = createContext<AuthContextInterface | null>(null)