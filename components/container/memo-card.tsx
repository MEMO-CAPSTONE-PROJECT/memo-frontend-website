import { twMerge } from "tailwind-merge"

interface MemoCard {
    children: React.ReactNode
    className?: string
}

export default function MemoCard({ children, className }: MemoCard) {
    return (
        <div className={twMerge(`flex flex-col items-center justify-center bg-system-white rounded-lg min-h-fit p-16 space-y-xl`, className)}>
            {children}
        </div>
    )
}