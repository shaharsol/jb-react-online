import { jwtDecode } from "jwt-decode"
import { useContext, useMemo } from "react"
import { AuthContext } from "../components/auth/auth/AuthContext"
import User from "../models/user/User"

export default function useUsername() {
    const { jwt } = useContext(AuthContext)!

    const name = useMemo(() => {
        const { name } = jwtDecode<User>(jwt)
        return name
    }, [ jwt ])

    return name 
}