import { useEffect } from 'react'
import './Followers.css'
import followersService from '../../../services/followers'
import Follow from '../follow/Follow'
import Spinner from '../../common/spinner/Spinner'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { init } from '../../../redux/followersSlice'

export default function Followers() {

    const dispatch = useAppDispatch()
    const followers = useAppSelector(state => state.followers.followers)

    useEffect(() => {
        (async() => {
            try {
                const followers = await followersService.getFollowers()
                dispatch(init(followers))
            } catch (e) {
                alert(e)
            }
        })()
    }, [ dispatch ])
    
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