import { Case, Switch } from "@/components/switch/switch";
import { Color } from "@/constants/theme/color";
import { CheckCircle, PencilSimpleSlash, XCircle } from "@phosphor-icons/react/dist/ssr";
import * as React from 'react';
import { twMerge } from "tailwind-merge";

export interface MemoInputTextProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    size?: keyof MemoInputTextSize
    state?: keyof MemoInputTextVariant
}

interface MemoInputTextSize {
    full: string
    medium: string
    small: string
}
interface MemoInputTextVariant {
    default: InputContainer
    error: InputContainer
    success: InputContainer
    disabled: InputContainer
}
interface InputContainer {
    container: string
    input: string
}

export default function MemoInputText({
    state = "default", size = "medium", ...inputProps
}: Readonly<MemoInputTextProps>) {
    const states: MemoInputTextVariant = {
        default: {
            container: "bg-system-light-gray border-xsm hover:border-body-1",
            input: "text-title-1 placeholder-body-2"
        },
        error: {
            container: "bg-system-error-light border-xsm border-system-error hover:border-body-1",
            input: "text-system-error placeholder-system-error"
        },
        success: {
            container: "bg-system-success-light border-xsm border-system-success hover:border-body-1",
            input: "text-system-success placeholder-system-success"
        },
        disabled: {
            container: "!bg-system-gray border-xsm !border-body-2",
            input: "!text-body-2 !placeholder-body-2"
        }
    }
    const sizes: MemoInputTextSize = {
        full: "w-full",
        medium: "w-96", //384px
        small: "w-48", //192px
    }
    const { container, input: inputClassName } = states[state]
    return (
        <div className={`group input flex items-center pr-3 ${container} ${sizes[size]}`}>
            <input 
                className={twMerge(`grow font-regular text-body group-hover:!border-primary-2`, inputClassName)}
                disabled={state === "disabled"}
                {...inputProps}
            />
            {state !== "default" && (
                <div className="flex items-center justify-center">
                    <Switch test={state}>
                        <Case value="error">
                            <XCircle size={24} color={Color["system-error"]} weight="bold"/>
                        </Case>
                        <Case value="success">
                            <CheckCircle size={24} color={Color["system-success"]} weight="bold"/>
                        </Case>
                        <Case value="disabled">
                            <PencilSimpleSlash size={24} color={Color["body-2"]} weight="bold"/>
                        </Case>
                    </Switch>
                </div>
            )}
        </div>
    )
}