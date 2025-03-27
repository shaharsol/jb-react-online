import { useEffect } from 'react'
import './Following.css'
import Follow from '../follow/Follow'
import Spinner from '../../common/spinner/Spinner'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { init } from '../../../redux/followingSlice'
import useService from '../../hooks/useService'
import FollowingService from '../../../services/auth-aware/FollowingService'

export default function Following() {
    const following = useAppSelector(state => state.following.following)
    const dispatch = useAppDispatch()

    const followingService = useService(FollowingService)

    useEffect(() => {
        (async() => {
            try {
                if (following.length === 0) {
                    const following = await followingService.getFollowing()
                    dispatch(init(following))
                }
            } catch (e) {
                alert(e)
            }
        })()
    }, [])

    return (
        <div className='Followers'>
            {following.length === 0 && <Spinner />}
            {following.length > 0 && following.map(user => <Follow 
                                    key={user.id} 
                                    user={user}
                                    />)}
        </div>
    )
}