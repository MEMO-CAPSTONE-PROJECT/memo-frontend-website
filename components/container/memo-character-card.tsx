
interface MemoCharacterCardProps {
    title: string
    children: React.ReactNode
}

export default function MemoCharacterCard({ title, children }: Readonly<MemoCharacterCardProps>) {
    return (
        <div className="group rounded-md overflow-clip">
            <div className="
                        relative flex flex-col items-center justify-center border-sm rounded-md text-body-2 border-system-gray space-y-lg px-3xl py-lg 
                        group-hover:border-primary-2 group-hover:bg-primary-2 group-hover:text-system-white
                        "
            >
                <div className="z-20">{children}</div>
                <p className="z-20 text-title text-center font-bold">{title}</p>
                <div className="z-10 invisible group-hover:visible w-[175px] h-[175px] absolute bottom-[2.5rem] -right-[6.5rem] rounded-[100%] border-[50px] border-title-1 opacity-20"/>
                <div className="z-10 invisible group-hover:visible w-[175px] h-[175px] absolute -bottom-[6.5rem] right-[2.5rem] rounded-[100%] border-[50px] border-title-1 opacity-20"></div>
            </div>  
        </div>
    )
}