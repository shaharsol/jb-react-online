import kitziImageSource from '../../assets/images/kitzi.jpeg'
import './Kitzi.css'

export default function Kitzi() {
    return (
        <div className="Kitzi">
            <h3>Kitzi</h3>
            <img src={kitziImageSource} />
        </div>
    )
}