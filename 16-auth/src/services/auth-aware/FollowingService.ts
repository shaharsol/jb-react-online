import User from "../../models/user/User"
import AuthAware from "./AuthAware"

export default class FollowingService extends AuthAware{
    async getFollowing(): Promise<User[]> {
        const response = await this.axiosInstance.get<User[]>(`${import.meta.env.VITE_REST_SERVER_URL}/follows/following`)
        return response.data
    }

    async unfollow(id: string): Promise<boolean> {
        const response = await this.axiosInstance.post<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/follows/unfollow/${id}`)
        return response.data
    }

    async follow(id: string): Promise<boolean> {
        const response = await this.axiosInstance.post<boolean>(`${import.meta.env.VITE_REST_SERVER_URL}/follows/follow/${id}`)
        return response.data
    }

}