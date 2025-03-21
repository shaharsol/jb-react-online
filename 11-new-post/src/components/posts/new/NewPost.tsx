import { useForm } from 'react-hook-form'
import './NewPost.css'
import PostDraft from '../../../models/post/PostDraft'
import profileService from '../../../services/profile'
import Post from '../../../models/post/Post'

interface NewPostProps {
    addPost(post: Post): void
}
export default function NewPost(props: NewPostProps) {

    const { addPost } = props

    const { register, handleSubmit } = useForm<PostDraft>()

    async function submit(draft: PostDraft) {
        try {
            const newPost = await profileService.create(draft)
            addPost(newPost)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='NewPost'>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder='Title your post...' {...register('title')}/>
                <textarea placeholder='Your post body...' {...register('body')}></textarea>
                <button>Add Post</button>
            </form>
        </div>
    )
}