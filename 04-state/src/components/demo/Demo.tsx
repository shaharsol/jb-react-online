import { useEffect, useRef, useState } from 'react'
import './Demo.css'

export default function Demo() {

    const startTime = useRef<string>((new Date()).toLocaleTimeString())
    const [currentTime, setCurrentTime] = useState<string>((new Date()).toLocaleTimeString())
    
    // useEffect 2nd param options:
    // nothing at all : run the effect on each re-render
    // [] : run the effect only on component startup
    // [<list of variables>]: run the effect only when one of the variables changes
    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log('setting current time...')
            setCurrentTime((new Date()).toLocaleTimeString())
        }, 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <div className='Demo'>
            <p>started at: {startTime.current}</p>
            <p>current time: {currentTime}</p>
        </div>
    )
}