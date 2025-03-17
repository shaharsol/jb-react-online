import { Route, Routes } from "react-router-dom";
import Profile from "../../posts/profile/Profile";
import Feed from "../../posts/feed/Feed";

export default function Main() {
    return (
        <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/feed" element={<Feed />} />
        </Routes>
    )
}