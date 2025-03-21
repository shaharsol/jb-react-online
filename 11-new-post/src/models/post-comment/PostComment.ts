import User from "../user/User";

export default interface PostComment {
    id: string,
    postId: string,
    userId: string,
    body: string,
    createdAt: string,
    updatedAt: string,
    user: User
}