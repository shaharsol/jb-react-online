import { useEffect } from 'react'
import './Followers.css'
import Follow from '../follow/Follow'
import Spinner from '../../common/spinner/Spinner'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { init } from '../../../redux/followersSlice'
import useService from '../../../hooks/useService'
import FollowersService from '../../../services/auth-aware/FollowersService'

export default function Followers() {

    const followers = useAppSelector(state => state.followers.followers)
    const dispatch = useAppDispatch()

    const followersService = useService(FollowersService)

    useEffect(() => {
        (async() => {
            try {
                if(followers.length === 0) {
                    const followers = await followersService.getFollowers()
                    dispatch(init(followers))
                }
            } catch (e) {
                alert(e)
            }
        })()
    }, [ dispatch, followers.length, followersService ])
    
    return (
        <div className='Followers'>
            {followers.length === 0 && <Spinner/>}
            {followers.length > 0 && followers.map(user => <Follow 
                                    key={user.id} 
                                    user={user}
                                    />)}
        </div>
    )
}