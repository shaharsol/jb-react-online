import { useForm } from 'react-hook-form'
import './Login.css'
import LoginModel from '../../../models/user/Login'
import authService from '../../../services/auth'
import { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'

export default function Login() {

    const { register, handleSubmit } = useForm<LoginModel>()

    const { setJwt } = useContext(AuthContext)!

    async function submit(credentials: LoginModel) {
        try {
            const jwt = await authService.login(credentials)
            setJwt(jwt)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className='Login'>
            <form onSubmit={handleSubmit(submit)}>
                <input placeholder='username...' {...register('username')}/>
                <input placeholder='password' type="password" {...register('password')}/>
                <button>Login</button>
            </form>
        </div>
    )
}