import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: ButtonProps) {
    return (
        // The props w/ spread operator is sending all props that a HTML button can receive
        <button className="button" {...props} />
    )
}