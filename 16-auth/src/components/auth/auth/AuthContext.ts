import { createContext } from "react"

interface AuthContextInterface {
    jwt: string,
    setJwt: React.Dispatch<React.SetStateAction<string>>
}

export const AuthContext = createContext<AuthContextInterface | null>(null)