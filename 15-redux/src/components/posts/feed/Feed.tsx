import { useEffect, useState } from 'react'
import './Feed.css'
import PostModel from '../../../models/post/Post'
import feedService from '../../../services/feed'
import Post from '../post/Post'
import Spinner from '../../common/spinner/Spinner'
import useTitle from '../../hooks/use-title'

export default function Feed() {
    const [ feed, setFeed ] = useState<PostModel[]>([])

    useTitle('Feed')

    useEffect(() => {
        (async() => {
            try {
                const feed = await feedService.getFeed()
                setFeed(feed)
            } catch (e) {
                alert(e)
            }
        })()
    }, [])
    
    return (
        <div className='Feed'>

            {feed.length === 0 && <Spinner />}

            {feed.length > 0 && <>
                {feed.map(post => <Post 
                                key={post.id} 
                                post={post} 
                                isAllowedActions={false}
                                />)}
            </>}


        </div>
    )
}