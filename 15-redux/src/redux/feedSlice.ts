import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Post from "../models/post/Post";
import PostComment from "../models/post-comment/PostComment";

interface FeedState {
    posts: Post[]
    isNewConent: boolean
}

const initialState: FeedState = {
    posts: [],
    isNewConent: false
}

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload
            state.isNewConent = false
        },
        addComment: (state, action: PayloadAction<PostComment>) => {
            state.posts.find(p => p.id === action.payload.postId)?.comments.push(action.payload)
        },
        indicateNewContent: (state) => {
            state.isNewConent = true
        }

    }
})

export const { init, indicateNewContent } = feedSlice.actions

export default feedSlice.reducer