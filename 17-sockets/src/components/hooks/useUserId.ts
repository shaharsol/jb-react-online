import { jwtDecode } from "jwt-decode"
import { useContext, useMemo } from "react"
import { AuthContext } from "../auth/auth/AuthContext"
import User from "../../models/user/User"

export default function useUserId() {
    const { jwt } = useContext(AuthContext)!

    const id = useMemo(() => {
        const { id } = jwtDecode<User>(jwt)
        return id
    }, [ jwt ])

    return id 
}