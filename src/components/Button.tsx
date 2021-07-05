import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean,
}

// Everything that isnt "isOutlined", is inner "props"s
export function Button({ isOutlined = false, ...props }: ButtonProps) {
    return (
        // The props w/ spread operator is sending all props that a HTML button can receive
        <button
            className={`button ${isOutlined ? 'outlined' : ''}`}
            {...props}
        />
    )
}