import PostComment from "../post-comment/PostComment";
import User from "../user/User";

export default interface Post {
    id: string,
    userId: string,
    title: string,
    body: string,
    imageUrl: string,
    createdAt: string,
    updatedAt: string,
    comments: PostComment[],
    user: User
}