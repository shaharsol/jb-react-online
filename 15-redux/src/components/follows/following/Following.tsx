import { useEffect, useState } from 'react'
import './Following.css'
import User from '../../../models/user/User'
import followingService from '../../../services/following'
import Follow from '../follow/Follow'
import Spinner from '../../common/spinner/Spinner'
import { useAppDispatch } from '../../../redux/hooks'
import { init } from '../../../redux/followingSlice'

export default function Following() {
    const [ following, setFollowing ] = useState<User[]>([])

    const dispatch = useAppDispatch()

    useEffect(() => {
        (async() => {
            try {
                const following = await followingService.getFollowing()
                dispatch(init(following))
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