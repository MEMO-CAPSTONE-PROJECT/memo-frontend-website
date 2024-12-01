import { twMerge } from "tailwind-merge"

interface MemoWhite {
    children: React.ReactNode
    className?: string
}

export default function MemoWhite({ children, className }: Readonly<MemoWhite>) {
    return (
        <div className={twMerge(`flex-1 h-full bg-system-white ml-auto flex flex-col items-center justify-center space-y-xl overflow-auto`, className)}>
            {children}
        </div>
    )
}