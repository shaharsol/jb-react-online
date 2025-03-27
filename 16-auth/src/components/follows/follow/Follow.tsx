import { useState } from 'react'
import User from '../../../models/user/User'
import SpinnerButton from '../../common/spinner-button/SpinnerButton'
import './Follow.css'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { follow, unfollow } from '../../../redux/followingSlice'
import { indicateNewContent } from '../../../redux/feedSlice'
import useService from '../../hooks/useService'
import FollowingService from '../../../services/auth-aware/FollowingService'

interface FollowProps {
    user: User
}
export default function Follow(props: FollowProps) {

    const { id, name } = props.user

    const [ isSubmitting, setIsSubmitting ] = useState<boolean>(false)

    const isFollowing = useAppSelector(state => state.following.following.findIndex(f => f.id === id) > -1)
    const dispatch = useAppDispatch()

    const followingService = useService(FollowingService)

    async function unfollowMe() {
        try {
            setIsSubmitting(true)
            await followingService.unfollow(id)
            dispatch(unfollow({id}))
            dispatch(indicateNewContent())
        } catch (e) {
            alert(e)
        } finally {
            setIsSubmitting(false)
        }
    }

    async function followMe() {
        try {
            setIsSubmitting(true)
            await followingService.follow(id)
            dispatch(follow(props.user))
            dispatch(indicateNewContent())
        } catch (e) {
            alert(e)
        } finally {
            setIsSubmitting(false)
        }
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