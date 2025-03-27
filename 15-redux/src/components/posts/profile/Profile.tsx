import { useEffect } from 'react'
import profileService from '../../../services/profile'
import './Profile.css'
import Post from '../post/Post'
import NewPost from '../new/NewPost'
import Spinner from '../../common/spinner/Spinner'
import useTitle from '../../hooks/use-title'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { init } from '../../../redux/profileSlice'

export default function Profile() {

    const profile = useAppSelector(state => state.profile.posts)
    const dispatch = useAppDispatch()

    useTitle('Profile')

    useEffect(() => {
        (async() => {
            try {
                if(profile.length === 0) {
                    const profile = await profileService.getProfile()
                    dispatch(init(profile))
                }
            } catch (e) {
                alert(e)
            }
        })()
    }, [ dispatch, profile.length ])

    return (
        <div className='Profile'>

            {profile.length === 0 && <Spinner />}

            {profile.length > 0 && <>
                <NewPost />
                {profile.map(post => <Post 
                                        key={post.id} 
                                        post={post} 
                                        isAllowedActions={true}
                                    />)}
            </>}
        </div>
    )
}