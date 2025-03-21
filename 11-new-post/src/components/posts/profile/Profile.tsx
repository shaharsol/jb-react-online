import { useEffect, useState } from 'react'
import profileService from '../../../services/profile'
import './Profile.css'
import PostModel from '../../../models/post/Post'
import Post from '../post/Post'
import NewPost from '../new/NewPost'

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

    function removePost(id: string) {
        setProfile(profile.filter(post => post.id !== id))
    }

    return (
        <div className='Profile'>
            <NewPost />
            {profile.map(post => <Post 
                                    key={post.id} 
                                    post={post} 
                                    isAllowedActions={true}
                                    removePost={removePost}
                                />)}
        </div>
    )
}