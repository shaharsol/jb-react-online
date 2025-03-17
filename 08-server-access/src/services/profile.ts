import axios from "axios"
import Post from "../models/post/Post"

class ProfileService {
    async getProfile(): Promise<Post[]> {
        const response = await axios.get<Post[]>('http://localhost:3003/allow/profile')
        return response.data
    }
}

const profileService = new ProfileService()
export default profileService