import Kitzi from '../kitzi/Kitzi'
import Mitzi from '../mitzi/Mitzi'
import './Cats.css'

export default function Cats() {
    return (
        <div className='Cats'>
            <Mitzi />
            <Kitzi />
        </div>
    )
}