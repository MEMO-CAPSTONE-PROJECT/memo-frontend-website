import { Case, Switch } from "@/components/switch/switch";
import { Color } from "@/constants/theme/color";
import { MemoInputSize, MemoInputVariant } from "@/shared/types/input-type";
import { InputSizes, InputStates } from "@/shared/variants/input-variant";
import { CheckCircle, PencilSimpleSlash, XCircle } from "@phosphor-icons/react/dist/ssr";
import * as React from 'react';
import { twMerge } from "tailwind-merge";

export interface MemoInputTextProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
    size?: keyof MemoInputSize
    state?: keyof MemoInputVariant
}

export default function MemoInputText({
    state = "default", size = "medium", ...inputProps
}: Readonly<MemoInputTextProps>) {
    const { container, input: inputClassName } = InputStates[state]
    const containerSize = InputSizes[size]
    return (
        <div className={`group input flex items-center pr-3 ${container} ${containerSize}`}>
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