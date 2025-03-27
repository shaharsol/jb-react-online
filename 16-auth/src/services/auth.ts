import axios from "axios"
import Login from "../models/user/Login"

class AuthService {
    async login(credentials: Login): Promise<string> {
        const response = await axios.post(`${import.meta.env.VITE_REST_SERVER_URL}/auth/login`, credentials)
        const { jwt } = response.data 
        return jwt
    }
}

const authService = new AuthService()
export default authService