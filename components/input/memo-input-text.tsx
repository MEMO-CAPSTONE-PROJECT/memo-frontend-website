
interface MemoInputTextProps {
    placeholder: string
}

export default function MemoInputText({
    placeholder
}: Readonly<MemoInputTextProps>) {
    return (
        <input 
            type="text" 
            placeholder={placeholder} 
            className="input w-[400px] bg-system-light-gray placeholder:text-body-2 text-title-1 font-regular text-body" 
        />
    )
}