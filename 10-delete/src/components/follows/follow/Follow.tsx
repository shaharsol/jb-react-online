import User from '../../../models/user/User'
import followingService from '../../../services/following'
import './Follow.css'

interface FollowProps {
    user: User
    isAllowUnfollow: boolean,
    unfollow?(id: string): void
}
export default function Follow(props: FollowProps) {

    const { id, name } = props.user
    const { isAllowUnfollow, unfollow } = props

    async function unfollowMe() {
        try {
            await followingService.unfollow(id)
            unfollow!(id)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='Follow'>
            <img src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg"/>
            <h3>{name}</h3>
            <div>
                {isAllowUnfollow && <button onClick={unfollowMe}>unfollow</button>}
            </div>
        </div>
    )
}