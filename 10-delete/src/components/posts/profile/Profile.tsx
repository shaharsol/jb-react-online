import { useEffect, useState } from 'react'
import profileService from '../../../services/profile'
import './Profile.css'
import PostModel from '../../../models/post/Post'
import Post from '../post/Post'

export default function Profile() {

    const [ profile, setProfile ] = useState<PostModel[]>([])

    useEffect(() => {
        (async() => {
            try {
                const profile = await profileService.getProfile()
                setProfile(profile)
            } catch (e) {
                alert(e)
            }
        })()
    }, [])

    return (
        <div className='Profile'>
            {profile.map(post => <Post 
                                    key={post.id} 
                                    post={post} 
                                    isAllowedActions={true}
                                />)}
        </div>
    )
}