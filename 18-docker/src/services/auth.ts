import axios from "axios"
import Login from "../models/user/Login"
import Signup from "../models/user/Signup"

class AuthService {
    async login(credentials: Login): Promise<string> {
        const response = await axios.post(`${import.meta.env.VITE_REST_SERVER_URL}/auth/login`, credentials)
        const { jwt } = response.data 
        return jwt
    }

    async signup(signup: Signup): Promise<string> {
        const response = await axios.post(`${import.meta.env.VITE_REST_SERVER_URL}/auth/signup`, signup)
        const { jwt } = response.data 
        return jwt
    }
}

const authService = new AuthService()
export default authService