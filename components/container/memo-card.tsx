import { twMerge } from "tailwind-merge"

interface MemoCardProps {
    children: React.ReactNode
    className?: string
}

export default function MemoCard({ children, className }: Readonly<MemoCardProps>) {
    return (
        <div className={twMerge(`flex flex-col items-center justify-center bg-system-white rounded-lg min-h-fit p-14 space-y-xl`, className)}>
            {children}
        </div>
    )
}