import User from "../user/User";
import PostCommentDraft from "./PostCommentDraft";

export default interface PostComment extends PostCommentDraft{
    id: string,
    postId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    user: User
}