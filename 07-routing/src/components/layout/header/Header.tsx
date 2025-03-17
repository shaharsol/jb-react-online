import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header() {
    return (
        <div className='Header'>
            <div>
                Logo
            </div>
            <div>
                <nav>
                    <NavLink to="/profile">profile</NavLink>
                    <NavLink to="/feed">feed</NavLink>
                </nav>
            </div>
            <div>
                Hello username
            </div>
        </div>
    )
}