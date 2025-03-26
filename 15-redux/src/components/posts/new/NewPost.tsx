import { useForm } from 'react-hook-form'
import './NewPost.css'
import PostDraft from '../../../models/post/PostDraft'
import profileService from '../../../services/profile'
import Post from '../../../models/post/Post'
import SpinnerButton from '../../common/spinner-button/SpinnerButton'

interface NewPostProps {
    addPost(post: Post): void
}
export default function NewPost(props: NewPostProps) {

    const { addPost } = props

    const { register, handleSubmit, formState, reset } = useForm<PostDraft>()

    async function submit(draft: PostDraft) {
        try {
            const newPost = await profileService.create(draft)
            reset()
            addPost(newPost)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='NewPost'>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder='Title your post...' {...register('title', {
                    required: {
                        value: true,
                        message: 'Title is a required field'
                    },
                    minLength: {
                        value: 10,
                        message: 'Title must be longer than 10 chars'
                    }
                })}/>
                <span className='form-error'>{formState.errors.title?.message}</span>
                <textarea placeholder='Your post body...' {...register('body', {
                    required: {
                        value: true,
                        message: 'Body is a required field'
                    },
                    minLength: {
                        value: 20,
                        message: 'Body must be longer than 20 chars'
                    }
                })}></textarea>
                <span className='form-error'>{formState.errors.body?.message}</span>
                <SpinnerButton 
                    isSubmitting={formState.isSubmitting}
                    buttonText='Add Post'
                    spinnerText='Adding post...'
                />
            </form>
        </div>
    )
}