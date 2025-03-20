import User from '../../../models/user/User'
import './Follow.css'

interface FollowProps {
    user: User
}
export default function Follow(props: FollowProps) {

    const { name } = props.user

    return (
        <div className='Follow'>
            <img src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg"/>
            <h3>{name}</h3>
        </div>
    )
}