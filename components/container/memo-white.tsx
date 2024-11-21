import { twMerge } from "tailwind-merge"

interface MemoWhite {
    children: React.ReactNode
    className?: string
}

export default function MemoWhite({ children, className }: MemoWhite) {
    return (
        <div className={twMerge(`w-1/2 h-screen bg-system-white ml-auto flex flex-col items-center justify-center space-y-xl`, className)}>
            {children}
        </div>
    )
}