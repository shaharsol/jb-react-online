import { useEffect, useState } from 'react'
import './Followers.css'
import User from '../../../models/user/User'
import followersService from '../../../services/followers'
import Follow from '../follow/Follow'
import Spinner from '../../common/spinner/Spinner'

export default function Followers() {

    const [ followers, setFollowers ] = useState<User[]>([])

    useEffect(() => {
        (async() => {
            try {
                const followers = await followersService.getFollowers()
                setFollowers(followers)
            } catch (e) {
                alert(e)
            }
        })()
    }, [])
    
    return (
        <div className='Followers'>
            {followers.length === 0 && <Spinner/>}
            {followers.length > 0 && followers.map(user => <Follow 
                                    key={user.id} 
                                    user={user}
                                    isAllowUnfollow={false}
                                    />)}
        </div>
    )
}