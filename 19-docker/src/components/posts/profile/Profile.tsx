import { useEffect } from 'react'
import './Profile.css'
import Post from '../post/Post'
import NewPost from '../new/NewPost'
import Spinner from '../../common/spinner/Spinner'
import useTitle from '../../../hooks/use-title'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { init } from '../../../redux/profileSlice'
import useService from '../../../hooks/useService'
import ProfileService from '../../../services/auth-aware/ProfileService'

export default function Profile() {

    const profile = useAppSelector(state => state.profile.posts)
    const dispatch = useAppDispatch()

    useTitle('Profile')

    const profileService = useService(ProfileService)

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
    }, [ dispatch, profile.length, profileService ])

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