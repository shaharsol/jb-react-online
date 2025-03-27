import { useNavigate, useParams } from 'react-router-dom'
import './EditPost.css'
import { useEffect, useState } from 'react'
import profileService from '../../../services/auth-aware/ProfileService'
import PostDraft from '../../../models/post/PostDraft'
import { useForm } from 'react-hook-form'
import Spinner from '../../common/spinner/Spinner'
import SpinnerButton from '../../common/spinner-button/SpinnerButton'
import useTitle from '../../hooks/use-title'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { update } from '../../../redux/profileSlice'


export default function EditPost() {

    const { id } = useParams<'id'>()

    const { register, handleSubmit, formState, reset } = useForm<PostDraft>()

    const [ isReady, setIsReady ] = useState<boolean>(false)

    useTitle('Edit Post')
    
    const post = useAppSelector(state => state.profile.posts.find(p => p.id === id!))
    useEffect(() => {
        (async() => {
            try {
                if (post) {
                    const { title, body } = post
                    reset({ title, body })
                    setIsReady(true)
                }
            } catch (e) {
                alert(e)
            }
        })()
    }, [ post, reset ])

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    async function submit(draft: PostDraft) {
        try {
            const updatedPost = await profileService.edit(id!, draft)
            dispatch(update(updatedPost))
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
                    <SpinnerButton 
                        isSubmitting={formState.isSubmitting}
                        buttonText='Edit Post'
                        spinnerText='saving changes to database'
                    />

                </form> 
            </>}

        </div>
    )
}