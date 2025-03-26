import axios from "axios"
import PostComment from "../models/post-comment/PostComment"
import PostCommentDraft from "../models/post-comment/PostCommentDraft"

class CommentsService {
    async add(postId: string, draft: PostCommentDraft): Promise<PostComment> {
        const response = await axios.post<PostComment>(`${import.meta.env.VITE_REST_SERVER_URL}/comments/${postId}`, draft)
        return response.data
    }
}

const commentsService = new CommentsService()
export default commentsService