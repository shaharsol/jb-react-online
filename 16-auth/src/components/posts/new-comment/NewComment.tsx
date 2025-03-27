import { useForm } from 'react-hook-form'
import PostCommentDraft from '../../../models/post-comment/PostCommentDraft'
import './NewComment.css'
import SpinnerButton from '../../common/spinner-button/SpinnerButton'
import { useAppDispatch } from '../../../redux/hooks'
import { addComment } from '../../../redux/profileSlice'
import useService from '../../hooks/useService'
import CommentsService from '../../../services/auth-aware/CommentsService'

interface NewCommentProps {
    postId: string,
}
export default function NewComment(props: NewCommentProps) {

    const { postId } = props

    const { register, handleSubmit, reset, formState } = useForm<PostCommentDraft>()

    const dispatch = useAppDispatch()

    const commentsService = useService(CommentsService)

    async function submit(draft: PostCommentDraft) {
        try {
            const newComment = await commentsService.add(postId, draft)
            dispatch(addComment(newComment))
            reset()
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='NewComment'>
            <form onSubmit={handleSubmit(submit)}>
                <textarea placeholder='add your comment...' {...register('body', {
                    required: {
                        value: true,
                        message: 'Comment is a required field'
                    },
                    minLength: {
                        value: 20,
                        message: 'Comment must be longer than 20 chars'
                    }
                })}></textarea>
                <span className='form-error'>{formState.errors.body?.message}</span>
                <SpinnerButton 
                    isSubmitting={formState.isSubmitting}
                    buttonText='Add Comment'
                    spinnerText='saving comment to database...'
                />
            </form>
        </div>
    )
}