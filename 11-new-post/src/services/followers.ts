import axios from "axios"
import User from "../models/user/User"

class FollowersService {
    async getFollowers(): Promise<User[]> {
        const response = await axios.get<User[]>(`${import.meta.env.VITE_REST_SERVER_URL}/follows/followers`)
        return response.data
    }
}

const followersService = new FollowersService()
export default followersService