import MemoErrorMessage, { MemoErrorMessageProps } from "@/components/helper/memo-error-message";
import MemoSelect, { MemoSelectProps } from "@/components/input/memo-select";

type MemoSelectHelperProps = MemoSelectProps & MemoErrorMessageProps

export default function MemoSelectHelper({ error, ...input }: Readonly<MemoSelectHelperProps>) {
    return (
        <div className="flex flex-col gap-sm">
            <MemoSelect state={error ? "error" : input.state} {...input}/>
            <MemoErrorMessage error={error}/>
        </div>
    )
}