import mitziImageSource from '../../assets/images/mitzi.jpeg'
import './Mitzi.css'

export default function Mitzi() {
    return (
        <div className="Mitzi">
            <h3>Mitzi</h3>
            <img src={mitziImageSource} />
        </div>
    )
}