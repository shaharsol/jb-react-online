import './Lucky.css'
import luckyImageSource from '../../assets/images/lucky.jpeg'

export default function Lucky() {
    return (
        <div className='Lucky'>
            <h3>Lucky</h3>
            <img src={luckyImageSource} />
        </div>
    )
}