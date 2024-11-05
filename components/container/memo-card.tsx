
interface MemoCard {
    children: React.ReactNode
}

export default function MemoCard({ children }: MemoCard) {
    return (
        <div className="flex flex-col items-center justify-center bg-system-white rounded-lg min-h-fit p-16 space-y-xl">{children}</div>
    )
}