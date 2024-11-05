import Image from "next/image";

interface MemoImageProps {
    src: string
    alt: string
    size: "small" | "medium" | "large"
    image: {
        width: number
        height: number
    }
}

export default function MemoImage({ src, alt, size, image: { width, height} }: Readonly<MemoImageProps>) {
    const container = {
        small: "w-[180px] h-[180px]",
        medium: "w-[360px] h-[360px]",
        large: "w-[540px] h-[540px]",
    }
    return (
        <div className={`flex flex-col items-center justify-center ${container[size]}`}>
            <Image src={src} alt={alt} width={width} height={height} />
        </div>
    )
}