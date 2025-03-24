import { useEffect, useState } from 'react'
import './Following.css'
import User from '../../../models/user/User'
import followingService from '../../../services/following'
import Follow from '../follow/Follow'

export default function Following() {
    const [ following, setFollowing ] = useState<User[]>([])

    useEffect(() => {
        (async() => {
            try {
                const following = await followingService.getFollowing()
                setFollowing(following)
            } catch (e) {
                alert(e)
            }
        })()
    }, [])

    function unfollow(id: string) {
        setFollowing(following.filter(user => user.id !== id))
    }
    
    return (
        <div className='Followers'>
            {following.map(user => <Follow 
                                    key={user.id} 
                                    user={user}
                                    isAllowUnfollow={true}
                                    unfollow={unfollow}
                                    />)}
        </div>
    )
}