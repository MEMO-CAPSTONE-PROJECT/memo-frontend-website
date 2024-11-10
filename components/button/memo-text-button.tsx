import { MouseEvent } from "react"

interface MemoTextButtonProps {
    title: string
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

export default function MemoTextButton({ onClick, title }: Readonly<MemoTextButtonProps>) {
    return (
        <button
            className={`font-regular underline text-body hover:ease-in hover:duration-150 hover:text-primary-2`}
            onClick={onClick}
        >
            {title}
        </button>
    )
}