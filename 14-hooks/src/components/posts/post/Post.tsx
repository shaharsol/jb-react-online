import { useNavigate } from 'react-router-dom';
import PostComment from '../../../models/post-comment/PostComment';
import PostModel from '../../../models/post/Post'
import profileService from '../../../services/profile';
import Comments from '../comments/Comments';
import './Post.css'
import SpinnerButton from '../../common/spinner-button/SpinnerButton';
import { useState } from 'react';

interface PostProps {
    post: PostModel,
    isAllowedActions: boolean,
    removePost?(id: string): void
    addComment(postId: string, comment: PostComment): void
}
export default function Post(props: PostProps) {

    const { id, title, body, user, createdAt, comments } = props.post;
    const { isAllowedActions, removePost, addComment } = props;

    const [ isDeleting, setIsDeleting ] = useState<boolean>(false)
    
    async function deleteMe() {
        try {
            if(confirm('are you sure you want to delete this post?')) {
                setIsDeleting(true)
                await profileService.remove(id)
                removePost!(id)
            }
        } catch (e) {
            alert(e)
        } finally {
            setIsDeleting(false)
        }
    }

    const navigate = useNavigate()
    function editMe() {
        navigate(`/profile/edit/${id}`)
    }

    return (
        <div className='Post'>
            <div className="title">{title}</div>
            <div className='by-line'>by {user.name} at {(new Date(createdAt)).toLocaleDateString()}</div>
            <div className='body'>{body}</div>
            {isAllowedActions && <div>
                <SpinnerButton 
                    isSubmitting={isDeleting}
                    buttonText='Delete'
                    spinnerText='deleting from database...'
                    onClick={deleteMe}
                />
                <button onClick={editMe}>Edit</button>
            </div>}
            <Comments 
                comments={comments}
                addComment={addComment}
                postId={id}
            />
            
        </div>
    )
}