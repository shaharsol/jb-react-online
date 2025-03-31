import { jwtDecode } from "jwt-decode"
import { useContext, useMemo } from "react"
import { AuthContext } from "../components/auth/auth/AuthContext"
import User from "../models/user/User"

export default function useUserId() {
    const { jwt } = useContext(AuthContext)!

    const id = useMemo(() => {
        try {
            const { id } = jwtDecode<User>(jwt)
            return id
        } catch (e) {
            console.log(e)
        }
    }, [ jwt ])

    return id 
}