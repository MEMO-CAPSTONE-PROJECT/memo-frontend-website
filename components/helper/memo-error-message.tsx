import { Color } from "@/constants/theme/color"
import { Warning } from "@phosphor-icons/react/dist/ssr"

export interface MemoErrorMessageProps {
    hideContainer?: boolean
    error?: string
}

export default function MemoErrorMessage({ error, hideContainer = true }: Readonly<MemoErrorMessageProps>) {
    if (!error && hideContainer) return null
    return (
        <div className={`flex flex-row items-center gap-sm ${!error ? "invisible" : ""}`}>
            <Warning size={24} color={Color["system-error"]} weight="bold"/>
            <p className="text-system-error leading-4">{error}</p>
        </div>
    )
}