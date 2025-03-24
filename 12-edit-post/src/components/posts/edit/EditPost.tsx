import { useParams } from 'react-router-dom'
import './EditPost.css'
import { useEffect } from 'react'
import profileService from '../../../services/profile'


export default function EditPost() {

    const { id } = useParams<'id'>()

    useEffect(() => {
        (async() => {
            try {
                const post = await profileService.getPost(id!)
                console.log(post)
            } catch (e) {
                alert(e)
            }
        })()
    }, [])

    return (
        <div className='EditPost'>
            edit 
        </div>
    )
}