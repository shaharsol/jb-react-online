import PostModel from '../../../models/post/Post'
import './Post.css'

interface PostProps {
    post: PostModel
}
export default function Post(props: PostProps) {

    const { title, body, user, createdAt} = props.post;

    return (
        <div className='Post'>
            <div className="title">{title}</div>
            <div className='by-line'>by {user.name} at {(new Date(createdAt)).toLocaleDateString()}</div>
            <div className='body'>{body}</div>
        </div>
    )
}