interface MemoInputTextProps {
    size?: keyof MemoInputTextSize
    state?: keyof MemoInputTextVariant
    placeholder?: string
}

interface MemoInputTextSize {
    full: string
    medium: string
    small: string
}
interface MemoInputTextVariant {
    default: string
    error: string
    success: string
    disabled: string
}

export default function MemoInputText({
    placeholder = "", state = "default", size = "medium"
}: Readonly<MemoInputTextProps>) {
    const states: MemoInputTextVariant = {
        default: "bg-system-light-gray [&>input]:text-title-1 [&>input]:placeholder-body-2",
        error: "bg-system-error-light [&>input]:text-system-error [&>input]:placeholder-system-error border-xsm border-system-error",
        success: "bg-system-success-light [&>input]:text-system-success [&>input]:placeholder-system-success border-xsm border-system-success",
        disabled: "!bg-system-gray [&>input]:!text-body-2 [&>input]:!placeholder-body-2 cursor-not-allowed border-xsm !border-body-2"
    }
    const sizes: MemoInputTextSize = {
        full: "w-full",
        medium: "w-96", //384px
        small: "w-48", //192px
    }
    return (
        <div className={`input flex items-center ${states[state]} ${sizes[size]}`}>
            <input 
                type="text" 
                placeholder={placeholder} 
                className="grow font-regular text-body"
                disabled={state === "disabled"}
            />
        </div>
    )
}