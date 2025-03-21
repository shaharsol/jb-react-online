import { useEffect, useState } from 'react'
import './Feed.css'
import PostModel from '../../../models/post/Post'
import feedService from '../../../services/feed'
import Post from '../post/Post'

export default function Feed() {
    const [ feed, setFeed ] = useState<PostModel[]>([])

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
             {feed.map(post => <Post 
                                key={post.id} 
                                post={post} 
                                isAllowedActions={false}
                                />)}
        </div>
    )
}