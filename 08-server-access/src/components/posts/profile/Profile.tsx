import { useEffect, useState } from 'react'
import profileService from '../../../services/profile'
import './Profile.css'
import Post from '../../../models/post/Post'

export default function Profile() {

    const [ profile, setProfile ] = useState<Post[]>([])

    useEffect(() => {
        (async() => {
            const profile = await profileService.getProfile()
            setProfile(profile)
        })()
    }, [])

    return (
        <div className='Profile'>
            <ul>
                {profile.map(post => <li key={post.id}>{post.title}</li>)}
            </ul>
        </div>
    )
}