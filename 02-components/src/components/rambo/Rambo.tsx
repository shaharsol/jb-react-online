import './Rambo.css'
import ramboImageSource from '../../assets/images/rambo.jpeg'

export default function Rambo() {
    return (
        <div className='Rambo'>
            <h3>Rambo</h3>
            <img src={ramboImageSource} />
        </div>
    )
}