import './SpinnerButton.css'
import spinnerSrc from '../../../assets/spinner.webp'
import { MouseEventHandler } from 'react'

interface SpinnerButtonProps {
    isSubmitting: boolean,
    buttonText: string,
    spinnerText: string,
    onClick?: MouseEventHandler<HTMLButtonElement>
}
export default function SpinnerButton(props: SpinnerButtonProps) {

    const { isSubmitting, buttonText, spinnerText, onClick } = props
    
    return (
        <div className='SpinnerButton'>
            {!isSubmitting && <button onClick={onClick}>{buttonText}</button>}
            {isSubmitting && <p>{spinnerText} <i><img src={spinnerSrc} /></i></p>}
        </div>
    )
}