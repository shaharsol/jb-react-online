import { useEffect } from 'react'
import './Followers.css'
import followersService from '../../../services/followers'
import Follow from '../follow/Follow'
import Spinner from '../../common/spinner/Spinner'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { init } from '../../../redux/followersSlice'

export default function Followers() {

    const followers = useAppSelector(state => state.followers.followers)
    const dispatch = useAppDispatch()

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
    }, [ dispatch, followers.length ])
    
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