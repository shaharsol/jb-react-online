import { useEffect, useState } from 'react'
import './Feed.css'
import Post from '../post/Post'
import Spinner from '../../common/spinner/Spinner'
import useTitle from '../../../hooks/use-title'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { init } from '../../../redux/feedSlice'
import SpinnerButton from '../../common/spinner-button/SpinnerButton'
import useService from '../../../hooks/useService'
import FeedService from '../../../services/auth-aware/FeedService'

export default function Feed() {
    const feed = useAppSelector(state => state.feed.posts)
    const isNewConent = useAppSelector(state => state.feed.isNewConent)

    const dispatch = useAppDispatch()

    useTitle('Feed')

    const feedService = useService(FeedService)

    useEffect(() => {
        (async() => {
            try {
                if(feed.length === 0) {
                    const feed = await feedService.getFeed()
                    dispatch(init(feed))
                }
            } catch (e) {
                alert(e)
            }
        })()
    }, [ dispatch, feed.length, feedService ])
    
    const [ isReloading, setIsRealoding ] = useState<boolean>(false)
    
    async function reload() {
        try {
            setIsRealoding(true)
            const feed = await feedService.getFeed()
            dispatch(init(feed))
        } catch (e) {
            alert(e)
        } finally {
            setIsRealoding(false)
        }
    }
    return (
        <div className='Feed'>

            {feed.length === 0 && <Spinner />}

            {feed.length > 0 && <>

                {isNewConent && <div className="new-content-alert">
                    your feed has updates. <SpinnerButton 
                                            onClick={reload}
                                            buttonText='Reload'
                                            spinnerText='reloading...'
                                            isSubmitting={isReloading}
                                          />
                </div>}

                {feed.map(post => <Post 
                                key={post.id} 
                                post={post} 
                                isAllowedActions={false}
                                />)}
            </>}


        </div>
    )
}