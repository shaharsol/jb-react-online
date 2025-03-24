import PostComment from '../../../models/post-comment/PostComment'
import './Comment.css'

interface CommentProps {
    comment: PostComment
}
export default function Comment(props: CommentProps) {

    const { comment: { body, createdAt, user: { name } } } = props

    return (
        <div className='Comment'>
            <div className='by-line'>by {name} at {(new Date(createdAt)).toLocaleDateString()}</div>
            <div>{body}</div>
        </div>
    )
}