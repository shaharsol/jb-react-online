import Cats from '../cats/Cats'
import Dogs from '../dogs/Dogs'
import './PetStore.css'

export default function PetStore() {
    return (
        <div className='PetStroe'>
            <Cats />
            <Dogs />
        </div>
    )
}