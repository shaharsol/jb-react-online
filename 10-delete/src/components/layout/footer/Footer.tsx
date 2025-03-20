import './Footer.css'

export default function Footer() {
    return (
        <div className='Footer'>
            Rest server at {import.meta.env.VITE_REST_SERVER_URL}
        </div>
    )
}