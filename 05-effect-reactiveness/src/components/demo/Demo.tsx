import { useEffect, useState } from 'react'
import './Demo.css'

export default function Demo() {

    const [animals, setAnimals] = useState<string[]>([])
    const [isDogs, setIsDogs] = useState<boolean>(true)


    function getDogs() {
        return ['Lucky', 'Rambo', 'Lassi']
    }

    function getCats() {
        return ['mitzi', 'kitzi']
    }

    function selectChanged() {
        setIsDogs(!isDogs)
    }

    useEffect(() => {
        setAnimals(isDogs ? getDogs() : getCats())
    }, [isDogs])

    return (
        <div className='Demo'>
            <select onChange={selectChanged}>
                <option value="dogs">dogs</option>
                <option value="cats">cats</option>
            </select>
            <ul>
                {animals.map(animal => <li key={animal}>{animal}</li>)}
            </ul>
        </div>
    )
}