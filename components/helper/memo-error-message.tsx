import { Color } from "@/constants/theme/color"
import { Warning, CheckCircle } from "@phosphor-icons/react/dist/ssr"

export interface MemoErrorMessageProps {
    hideContainer?: boolean
    error?: string
    status?: "success" | "error"
}

export default function MemoErrorMessage({ error, hideContainer = true, status = "error" }: Readonly<MemoErrorMessageProps>) {
    if (!error && hideContainer) return null

    const isSuccess = status === "success"

    return (
        <div className={`flex flex-row items-center gap-sm ${!error ? "invisible" : ""}`}>
            {isSuccess ? (
                <CheckCircle size={24} color={Color["system-success"]} weight="bold" />
            ) : (
                <Warning size={24} color={Color["system-error"]} weight="bold" />
            )}
            <p className={`leading-4 ${ isSuccess ? "text-system-success" : "text-system-error"}`}>{error}</p>
        </div>
    )
}
