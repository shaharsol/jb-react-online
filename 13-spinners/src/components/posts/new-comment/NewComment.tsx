import { useForm } from 'react-hook-form'
import PostCommentDraft from '../../../models/post-comment/PostCommentDraft'
import './NewComment.css'
import PostComment from '../../../models/post-comment/PostComment'
import commentsService from '../../../services/comments'
import SpinnerButton from '../../common/spinner-button/SpinnerButton'

interface NewCommentProps {
    postId: string,
    addComment(postId: string, comment: PostComment): void
}
export default function NewComment(props: NewCommentProps) {

    const { postId, addComment } = props

    const { register, handleSubmit, reset, formState } = useForm<PostCommentDraft>()

    async function submit(draft: PostCommentDraft) {
        try {
            const newComment = await commentsService.add(postId, draft)
            addComment(postId, newComment)
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