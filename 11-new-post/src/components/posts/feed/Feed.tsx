import { useEffect, useState } from 'react'
import './Feed.css'
import PostModel from '../../../models/post/Post'
import feedService from '../../../services/feed'
import Post from '../post/Post'
import PostComment from '../../../models/post-comment/PostComment'

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
    
    function addComment(postId: string, comment: PostComment) {
        const newFeed = [...feed]
        newFeed.find(post => post.id === postId)?.comments.push(comment)
        setFeed(newFeed)
    }

    return (
        <div className='Feed'>
             {feed.map(post => <Post 
                                key={post.id} 
                                post={post} 
                                isAllowedActions={false}
                                addComment={addComment}
                                />)}
        </div>
    )
}