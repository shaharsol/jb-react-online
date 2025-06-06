import PostModel from '../../../models/post/Post'
import profileService from '../../../services/profile';
import './Post.css'

interface PostProps {
    post: PostModel,
    isAllowedActions: boolean,
    removePost(id: string): void
}
export default function Post(props: PostProps) {

    const { id, title, body, user, createdAt} = props.post;
    const { isAllowedActions, removePost } = props;

    async function deleteMe() {
        try {
            if(confirm('are you sure you want to delete this post?')) {
                await profileService.remove(id)
                removePost(id)
            }
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='Post'>
            <div className="title">{title}</div>
            <div className='by-line'>by {user.name} at {(new Date(createdAt)).toLocaleDateString()}</div>
            <div className='body'>{body}</div>
            {isAllowedActions && <div><button onClick={deleteMe}>Delete</button></div>}
            
        </div>
    )
}