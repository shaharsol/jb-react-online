import { useEffect, useState } from 'react'
import './Feed.css'
import Post from '../../../models/post/Post'
import feedService from '../../../services/feed'

export default function Feed() {
    const [ feed, setFeed ] = useState<Post[]>([])

    useEffect(() => {
        (async() => {
            const feed = await feedService.getFeed()
            setFeed(feed)
        })()
    }, [])
    
    return (
        <div className='Feed'>
            <ul>
                {feed.map(post => <li key={post.id}>{post.title}</li>)}
            </ul>
        </div>
    )
}