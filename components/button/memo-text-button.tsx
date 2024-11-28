import { MouseEvent } from "react"

interface MemoTextButtonProps {
    title: string
    disabled?: boolean
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
    
}

export default function MemoTextButton({ onClick, title, disabled = false }: Readonly<MemoTextButtonProps>) {
    return (
        <button
            className={`font-regular underline text-body hover:ease-in hover:duration-150  ${disabled ? "text-body-2" : "text-title-1 hover:text-primary-2"}`}
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>
    )
}