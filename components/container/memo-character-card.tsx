
interface MemoCharacterCardProps {
    title?: string
    children?: React.ReactNode
    size?: keyof MemoCharacterCardSize
}

interface MemoCharacterCardSize {
    small: string
    medium: string
}

export default function MemoCharacterCard({ title, children, size = "medium" }: Readonly<MemoCharacterCardProps>) {
    const sizes: MemoCharacterCardSize = {
        small: "w-48 h-48",
        medium: "w-64 h-64",
    }
    const circle: MemoCharacterCardSize = {
        small: "w-44 h-44",
        medium: "w-44 h-44",
    }
    return (
        <div className="group rounded-md overflow-clip">
            <div className={`
                        relative flex flex-col items-center justify-center border-sm rounded-md text-body-2 border-system-gray space-y-lg px-3xl py-lg 
                        group-hover:border-primary-2 group-hover:bg-primary-2 group-hover:text-system-white
                        ${sizes[size]}
                        `}
            >
                    
                {children && <div className="z-20">{children}</div>}
                {title && <p className="z-20 text-title text-center font-bold">{title}</p>}
                <div className={`z-10 invisible group-hover:visible absolute bottom-[2.5rem] -right-[6.5rem] rounded-full border-[50px] border-title-1 opacity-20 ${circle[size]}`}></div>
                <div className={`z-10 invisible group-hover:visible absolute -bottom-[6.5rem] right-[2.5rem] rounded-full border-[50px] border-title-1 opacity-20 ${circle[size]}`}></div>
            </div>  
        </div>
    )
}