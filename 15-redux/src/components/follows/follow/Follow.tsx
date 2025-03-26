import { useState } from 'react'
import User from '../../../models/user/User'
import followingService from '../../../services/following'
import SpinnerButton from '../../common/spinner-button/SpinnerButton'
import './Follow.css'
import { useAppSelector } from '../../../redux/hooks'

interface FollowProps {
    user: User
    isAllowUnfollow: boolean,
    unfollow?(id: string): void
}
export default function Follow(props: FollowProps) {

    const { id, name } = props.user
    const { unfollow } = props

    const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false)

    const isFollowing = useAppSelector(state => state.following.following.findIndex(f => f.id === id) > -1)

    async function unfollowMe() {
        try {
            setIsSubmitting(true)
            await followingService.unfollow(id)
            unfollow!(id)
        } catch (e) {
            alert(e)
        } finally {
            setIsSubmitting(false)
        }
    }

    async function followMe() {

    }

    return (
        <div className='Follow'>
            <img src="https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg"/>
            <h3>{name}</h3>
            <div>
                {isFollowing && <SpinnerButton
                                        isSubmitting={isSubmitting}     
                                        buttonText='Unfollow'
                                        spinnerText='unfollowing...'
                                        onClick={unfollowMe}
                                    />
                }
                {!isFollowing && <SpinnerButton
                                    isSubmitting={isSubmitting}     
                                    buttonText='Follow'
                                    spinnerText='Following...'
                                    onClick={followMe}
                                />
                }
            </div>
        </div>
    )
}