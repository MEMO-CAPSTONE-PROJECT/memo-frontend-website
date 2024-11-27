import { MemoInputSize, MemoInputVariant } from "@/shared/types/input-type";
import { InputSizes, InputStates } from "@/shared/variants/input-variant";
import React from "react";

export interface MemoSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>,"size"> {
    options: string[]
    placeholder?: string
    size?: keyof MemoInputSize
    state?: keyof MemoInputVariant
}

export default function MemoSelect({
    placeholder, options, state = "default", size = "medium", ...selectProps
}: Readonly<MemoSelectProps>) {
    const { container, input: inputClassName, placeholder: placeholderClassName } = InputStates[state]
    const containerSize = InputSizes[size]
    return (
        <select 
            className={`group select flex items-center pr-3 font-regular text-body ${container} ${containerSize} ${inputClassName} invalid:${placeholderClassName}`} 
            required 
            disabled={state === "disabled"}
            {...selectProps}
        >
            <option value="" disabled>{placeholder}</option>
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    )
}

// import { MemoInputSize, MemoInputVariant } from "@/shared/types/input-type";
// import { InputSizes, InputStates } from "@/shared/variants/input-variant";
// import React from "react";

// export interface MemoSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
//   options: string[];
//   placeholder?: string;
//   size?: keyof MemoInputSize;
//   state?: keyof MemoInputVariant;
// }

// export default function MemoSelect({
//   placeholder, options, state = "default", size = "medium", value, onChange, ...selectProps
// }: Readonly<MemoSelectProps>) {
//   const { container, input: inputClassName, placeholder: placeholderClassName } = InputStates[state];
//   const containerSize = InputSizes[size];

//   return (
//     <select
//       className={`group select flex items-center pr-3 font-regular text-body ${container} ${containerSize} ${inputClassName} invalid:${placeholderClassName}`}
//       required
//       disabled={state === "disabled"}
//       value={value} 
//       onChange={onChange} // ต้องจัดการ onChange
//       {...selectProps}
//     >
//       <option value="" disabled>{placeholder}</option>
//       {options.map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   );
// }
