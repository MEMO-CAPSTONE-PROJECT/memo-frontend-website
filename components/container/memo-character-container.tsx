
interface MemoImageProps {
    svg: React.ReactNode
    size: keyof MemoContainerSize
}

interface MemoContainerSize {
    small: string
    medium: string
    large: string
}

export default function MemoCharacterContainer({ svg, size }: Readonly<MemoImageProps>) {
    const container: MemoContainerSize = {
        small: "w-[180px] h-[180px]",
        medium: "w-[360px] h-[360px]",
        large: "w-[540px] h-[540px]",
    }
    return (
        <div className={`flex flex-col items-center justify-center ${container[size]}`}>
            {svg}
        </div>
    )
}