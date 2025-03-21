import axios from "axios"
import Post from "../models/post/Post"
import PostDraft from "../models/post/PostDraft"

class ProfileService {
    async getProfile(): Promise<Post[]> {
        const response = await axios.get<Post[]>(`${import.meta.env.VITE_REST_SERVER_URL}/profile`)
        return response.data
    }

    async remove(id: string): Promise<boolean> {
        const response = await axios.delete<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/profile/${id}`)
        return response.data
    }

    async create(draft: PostDraft): Promise<Post> {
        const response = await axios.post<Post>(`${import.meta.env.VITE_REST_SERVER_URL}/profile`, draft)
        return response.data
    }
}

const profileService = new ProfileService()
export default profileService