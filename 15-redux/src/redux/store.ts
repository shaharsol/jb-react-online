import { configureStore } from "@reduxjs/toolkit";
import { followingSlice } from "./followingSlice";
import { followersSlice } from "./followersSlice";

const store = configureStore({
    reducer: {
        following: followingSlice.reducer,
        followers: followersSlice.reducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch