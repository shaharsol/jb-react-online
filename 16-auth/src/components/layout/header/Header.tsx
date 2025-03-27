import { NavLink } from 'react-router-dom'
import './Header.css'
import useUsername from '../../hooks/useUsername'

export default function Header() {

    const name = useUsername()

    return (
        <div className='Header'>
            <div>
                Logo
            </div>
            <div>
                <nav>
                    <NavLink to="/profile">profile</NavLink>
                    <NavLink to="/feed">feed</NavLink>
                    <NavLink to="/search">search</NavLink>
                </nav>
            </div>
            <div>
                Hello {name}
            </div>
        </div>
    )
}