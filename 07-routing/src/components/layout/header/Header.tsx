import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
    return (
        <div className='Header'>
            <div>
                Logo
            </div>
            <div>
                <nav>
                    <Link to="/profile">profile</Link>
                    <Link to="/feed">feed</Link>
                </nav>
            </div>
            <div>
                Hello username
            </div>
        </div>
    )
}