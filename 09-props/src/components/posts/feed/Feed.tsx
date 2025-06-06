import { useEffect, useState } from 'react'
import './Feed.css'
import PostModel from '../../../models/post/Post'
import feedService from '../../../services/feed'
import Post from '../post/Post'

export default function Feed() {
    const [ feed, setFeed ] = useState<PostModel[]>([])

    useEffect(() => {
        (async() => {
            const feed = await feedService.getFeed()
            setFeed(feed)
        })()
    }, [])
    
    return (
        <div className='Feed'>
             {feed.map(post => <Post key={post.id} post={post}/>)}
        </div>
    )
}