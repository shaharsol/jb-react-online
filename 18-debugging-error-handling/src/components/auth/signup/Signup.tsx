import { useContext } from 'react'
import './Signup.css'
import { AuthContext } from '../auth/AuthContext'
import { useForm } from 'react-hook-form'
import authService from '../../../services/auth'
import SignupModel from '../../../models/user/Signup'

export default function Signup() {
    const { register, handleSubmit } = useForm<SignupModel>()

    const { newLogin } = useContext(AuthContext)!

    async function submit(signup: SignupModel) {
        try {
            const jwt = await authService.signup(signup)
            newLogin(jwt)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='Signup'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder='name...' {...register('name')}/>
                <input placeholder='username...' {...register('username')}/>
                <input placeholder='password' type="password" {...register('password')}/>
                <button>Signup</button>
            </form>
        </div>
    )
}