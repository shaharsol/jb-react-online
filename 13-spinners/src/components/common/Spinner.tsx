import './Spinner.css'
import spinnerSrc from '../../assets/spinner.webp'

export default function Spinner() {
    return (
        <div className='Spinner'>
            <img src={spinnerSrc}/>
        </div>
    )
}