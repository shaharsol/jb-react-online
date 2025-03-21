import { useForm } from 'react-hook-form'
import './NewPost.css'
import PostDraft from '../../../models/post/PostDraft'
// import profileService from '../../../services/profile'

export default function NewPost() {

    const { register, handleSubmit } = useForm<PostDraft>()

    async function addPost(draft: PostDraft) {
        console.log(draft)
        try {
            // const newPost = await profileService.create(draft)
            // console.log(newPost)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='NewPost'>
            <form onSubmit={handleSubmit(addPost)}>
                <input type="text" placeholder='Title your post...' {...register('title')}/>
                <textarea placeholder='Your post body...' {...register('body')}></textarea>
                <button>Add Post</button>
            </form>
        </div>
    )
}