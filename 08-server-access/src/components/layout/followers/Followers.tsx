import { useEffect, useState } from 'react'
import './Followers.css'
import User from '../../../models/user/User'
import followersService from '../../../services/followers'

export default function Followers() {

    const [ followers, setFollowers ] = useState<User[]>([])

    useEffect(() => {
        (async() => {
            const followers = await followersService.getFollowers()
            setFollowers(followers)
        })()
    }, [])
    return (
        <div className='Followers'>
            <ul>
                {followers.map(user => <li key={user.id}>{user.name}</li>)}
            </ul>
        </div>
    )
}