import { useEffect, useState } from 'react'
import './Following.css'
import User from '../../../models/user/User'
import followingService from '../../../services/following'

export default function Following() {
    const [ following, setFollowing ] = useState<User[]>([])

    useEffect(() => {
        (async() => {
            const following = await followingService.getFollowing()
            setFollowing(following)
        })()
    }, [])
    
    return (
        <div className='Followers'>
            <ul>
                {following.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>
        </div>
    )
}