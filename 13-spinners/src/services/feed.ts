import axios from "axios"
import Post from "../models/post/Post"

class FeedService {
    async getFeed(): Promise<Post[]> {
        const response = await axios.get<Post[]>(`${import.meta.env.VITE_REST_SERVER_URL}/feed`)
        return response.data
    }
}

const feedService = new FeedService()
export default feedService