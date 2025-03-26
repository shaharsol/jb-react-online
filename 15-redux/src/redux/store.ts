import { configureStore } from "@reduxjs/toolkit";
import { followingSlice } from "./followingSlice";

const store = configureStore({
    reducer: {
        following: followingSlice.reducer
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch