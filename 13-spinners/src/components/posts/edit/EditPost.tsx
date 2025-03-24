import { useNavigate, useParams } from 'react-router-dom'
import './EditPost.css'
import { useEffect, useState } from 'react'
import profileService from '../../../services/profile'
import PostDraft from '../../../models/post/PostDraft'
import { useForm } from 'react-hook-form'
import Spinner from '../../common/spinner/Spinner'


export default function EditPost() {

    const { id } = useParams<'id'>()

    const { register, handleSubmit, formState, reset } = useForm<PostDraft>()

    const [ isReady, setIsReady ] = useState<boolean>(false)

    useEffect(() => {
        (async() => {
            try {
                const post = await profileService.getPost(id!)
                const { title, body } = post
                reset({ title, body })
                setIsReady(true)
            } catch (e) {
                alert(e)
            }
        })()
    }, [ id, reset ])

    const navigate = useNavigate()

    async function submit(draft: PostDraft) {
        try {
            await profileService.edit(id!, draft)
            alert('post edited successfuly')
            navigate('/profile')
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='EditPost'>

            {!isReady && <Spinner />}

            {isReady && <>
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
                    {!formState.isSubmitting && <button>Edit Post</button>}
                    {formState.isSubmitting && <p>saving changes to database... <i><Spinner /></i></p>}
                </form> 
            </>}

        </div>
    )
}