import MemoErrorMessage, { MemoErrorMessageProps } from "@/components/helper/memo-error-message";
import MemoInputText, { MemoInputTextProps } from "@/components/input/memo-input-text";

type MemoInputTextHelperProps = MemoInputTextProps & MemoErrorMessageProps

export default function MemoInputTextHelper({ error, ...input }: Readonly<MemoInputTextHelperProps>) {
    return (
        <div className="flex flex-col gap-sm">
            <MemoInputText state={error ? "error" : input.state} {...input}/>
            <MemoErrorMessage error={error}/>
        </div>
    )
}