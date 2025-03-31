import { useForm } from 'react-hook-form'
import './NewPost.css'
import PostDraft from '../../../models/post/PostDraft'
import SpinnerButton from '../../common/spinner-button/SpinnerButton'
import { useAppDispatch } from '../../../redux/hooks'
import { newPost } from '../../../redux/profileSlice'
import useService from '../../../hooks/useService'
import ProfileService from '../../../services/auth-aware/ProfileService'
import extractErrors from '../../../utils/errorExtractor'

export default function NewPost() {

    const { register, handleSubmit, formState, reset } = useForm<PostDraft>()

    const dispatch = useAppDispatch()

    const profileService = useService(ProfileService)
    
    async function submit(draft: PostDraft) {
        try {
            const post = await profileService.create(draft)
            reset()
            dispatch(newPost(post))
        } catch (e) {
            alert(extractErrors(e))
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
                        value: 1,
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