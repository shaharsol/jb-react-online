import PostComment from "../post-comment/PostComment";
import User from "../user/User";
import PostDraft from "./PostDraft";

export default interface Post extends PostDraft{
    id: string,
    userId: string,
    imageUrl: string,
    createdAt: string,
    updatedAt: string,
    comments: PostComment[],
    user: User
}