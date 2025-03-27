import { useForm } from 'react-hook-form'
import './Login.css'
import LoginModel from '../../../models/user/Login'
import authService from '../../../services/auth'

export default function Login() {

    const { register, handleSubmit } = useForm<LoginModel>()

    async function submit(credentials: LoginModel) {
        try {
            const jwt = await authService.login(credentials)
            console.log(jwt)
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