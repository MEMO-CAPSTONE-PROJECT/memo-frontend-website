"use client"

import { MemoInputVariant } from "@/shared/types/input-type"
import { isNumeric } from "@/shared/utils/number"
import { InputStates } from "@/shared/variants/input-variant"
import { ChangeEvent, useState } from "react"

interface MemoOtpInputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
    state?: keyof MemoInputVariant
    defaultValue?: string
}

export default function MemoOtpInputText({ state = "default", defaultValue = "", ...inputProps }: Readonly<MemoOtpInputTextProps>) {
    const [number, setNumber] = useState(defaultValue);
    const digits = 1;
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value && !isNumeric(value)) return;
        setNumber(value.slice(0, digits))
    }
    const { container, input } = InputStates[state]
    return (
        <div className={`group input flex w-16 h-16 items-center ${container}`}>
            <input 
                type="number"
                className={`grow text-header text-center w-full font-bold group-hover:!border-primary-2 ${input}`}
                disabled={state === "disabled"}
                value={number}
                onChange={handleChange}
                {...inputProps}
            />
        </div>
    )
}