import { useEffect } from 'react'
import './Following.css'
import followingService from '../../../services/following'
import Follow from '../follow/Follow'
import Spinner from '../../common/spinner/Spinner'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { init } from '../../../redux/followingSlice'

export default function Following() {
    const following = useAppSelector(state => state.following.following)
    const dispatch = useAppDispatch()

    useEffect(() => {
        (async() => {
            try {
                if (following.length === 0) {
                    const following = await followingService.getFollowing()
                    dispatch(init(following))
                }
            } catch (e) {
                alert(e)
            }
        })()
    }, [])

    function unfollow(id: string) {
        // setFollowing(following.filter(user => user.id !== id))
        console.log(id)
    }
    
    return (
        <div className='Followers'>
            {following.length === 0 && <Spinner />}
            {following.length > 0 && following.map(user => <Follow 
                                    key={user.id} 
                                    user={user}
                                    isAllowUnfollow={true}
                                    unfollow={unfollow}
                                    />)}
        </div>
    )
}