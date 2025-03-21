import axios from "axios"
import User from "../models/user/User"

class FollowingService {
    async getFollowing(): Promise<User[]> {
        const response = await axios.get<User[]>(`${import.meta.env.VITE_REST_SERVER_URL}/follows/following`)
        return response.data
    }

    async unfollow(id: string): Promise<boolean> {
        const response = await axios.post<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/follows/unfollow/${id}`)
        return response.data
    }
}

const followingService = new FollowingService()
export default followingService