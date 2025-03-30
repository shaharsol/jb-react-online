import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../models/user/User";

interface FollowersState {
    followers: User[]
}

const initialState: FollowersState = {
    followers: []
}

export const followersSlice = createSlice({
    name: 'followers',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<User[]>) => {
            state.followers = action.payload
        },
        newFollower: (state, action: PayloadAction<User>) => {
            state.followers.push(action.payload)
        },
        followRemoved: (state, action: PayloadAction<{id: string}>) => {
            state.followers = state.followers.filter(f => f.id !== action.payload.id)
        }
    }
})

export const { init, newFollower, followRemoved } = followersSlice.actions

export default followersSlice.reducer