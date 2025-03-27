import { useNavigate } from 'react-router-dom';
import PostModel from '../../../models/post/Post'
import Comments from '../comments/Comments';
import './Post.css'
import SpinnerButton from '../../common/spinner-button/SpinnerButton';
import { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import { remove } from '../../../redux/profileSlice';
import useService from '../../hooks/useService';
import ProfileService from '../../../services/auth-aware/ProfileService';

interface PostProps {
    post: PostModel,
    isAllowedActions: boolean,
}
export default function Post(props: PostProps) {

    const { id, title, body, user, createdAt, comments } = props.post;
    const { isAllowedActions } = props;

    const [ isDeleting, setIsDeleting ] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    
    const profileService = useService(ProfileService)
    
    async function deleteMe() {
        try {
            if(confirm('are you sure you want to delete this post?')) {
                setIsDeleting(true)
                await profileService.remove(id)
                dispatch(remove({id}))
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
                postId={id}
            />
            
        </div>
    )
}