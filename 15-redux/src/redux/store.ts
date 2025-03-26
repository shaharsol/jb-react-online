import { configureStore } from "@reduxjs/toolkit";
import { followingSlice } from "./followingSlice";
import { followersSlice } from "./followersSlice";
import { profileSlice } from "./profileSlice";

const store = configureStore({
    reducer: {
        following: followingSlice.reducer,
        followers: followersSlice.reducer,
        profile: profileSlice.reducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch