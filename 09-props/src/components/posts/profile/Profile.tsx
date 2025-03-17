import { useEffect, useState } from 'react'
import profileService from '../../../services/profile'
import './Profile.css'
import PostModel from '../../../models/post/Post'
import Post from '../post/Post'

export default function Profile() {

    const [ profile, setProfile ] = useState<PostModel[]>([])

    useEffect(() => {
        (async() => {
            const profile = await profileService.getProfile()
            setProfile(profile)
        })()
    }, [])

    return (
        <div className='Profile'>
            {profile.map(post => <Post key={post.id} post={post}/>)}
        </div>
    )
}