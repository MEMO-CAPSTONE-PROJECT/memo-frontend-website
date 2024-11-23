import { MemoInputSize, MemoInputVariant } from "@/shared/types/input-type";

export const InputStates: MemoInputVariant = {
    default: {
        container: "bg-system-light-gray border-xsm hover:border-body-1",
        input: "text-title-1 placeholder-body-2",
        placeholder: "text-body-2",
    },
    error: {
        container: "bg-system-error-light border-xsm border-system-error hover:border-body-1",
        input: "text-system-error placeholder-system-error",
        placeholder: "text-system-error",
    },
    success: {
        container: "bg-system-success-light border-xsm border-system-success hover:border-body-1",
        input: "text-system-success placeholder-system-success",
        placeholder: "text-system-success",
    },
    disabled: {
        container: "!bg-system-gray border-xsm !border-body-2",
        input: "!text-body-2 !placeholder-body-2",
        placeholder: "text-body-2",
    }
}

export const InputSizes: MemoInputSize = {
    full: "w-full",
    medium: "w-96", //384px
    small: "w-48", //192px
}