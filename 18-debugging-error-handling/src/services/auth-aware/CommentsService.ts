import PostComment from "../../models/post-comment/PostComment"
import PostCommentDraft from "../../models/post-comment/PostCommentDraft"
import AuthAware from "./AuthAware"

export default class CommentsService extends AuthAware {
    async add(postId: string, draft: PostCommentDraft): Promise<PostComment> {
        const response = await this.axiosInstance.post<PostComment>(`${import.meta.env.VITE_REST_SERVER_URL}/comments/${postId}`, draft)
        return response.data
    }
}
