import { useContext } from 'react'
import Followers from '../../follows/followers/Followers'
import Following from '../../follows/following/Following'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import Main from '../main/Main'
import './Layout.css'
import Login from '../../auth/login/Login'
import { AuthContext } from '../../auth/auth/AuthContext'
import Signup from '../../auth/signup/Signup'

export default function Layout() {

    const { jwt } = useContext(AuthContext)!
    const isLoggedIn = !!jwt

    return (
        <div className='Layout'>

            {isLoggedIn && <>
                <header>
                    <Header />
                </header>
                <aside>
                    <Following />
                </aside>
                <aside>
                    <Followers />
                </aside>
                <main>
                    <Main />
                </main>
                <footer>
                    <Footer />
                </footer>
            </>}

            {!isLoggedIn && <>
                <Login />
                <Signup />
            </>}

        </div>
    )
}