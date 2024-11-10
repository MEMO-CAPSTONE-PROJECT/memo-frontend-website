"use client"

import { isNumeric } from "@/shared/utils/number"
import { ChangeEvent, useState } from "react"

interface MemoOtpInputTextProps {
    state?: keyof MemoOtpInputTextVariant
    defaultValue?: string
}

interface MemoOtpInputTextVariant {
    default: InputContainer
    error: InputContainer
    success: InputContainer
    disabled: InputContainer
}
interface InputContainer {
    container: string
    input: string
}

export default function MemoOtpInputText({ state = "default", defaultValue = "" }: Readonly<MemoOtpInputTextProps>) {
    const [number, setNumber] = useState(defaultValue);
    const digits = 1;
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value && !isNumeric(value)) return;
        setNumber(value.slice(0, digits))
    }
    const states: MemoOtpInputTextVariant = {
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
    const { container, input } = states[state]
    return (
        <div className={`group input flex w-16 h-16 items-center ${container}`}>
            <input 
                type="number"
                className={`grow text-header text-center w-full font-bold group-hover:!border-primary-2 ${input}`}
                disabled={state === "disabled"}
                value={number}
                onChange={handleChange}
            />
        </div>
    )
}