
export interface MemoInputSize {
    full: string
    medium: string
    small: string
    none: string
}
export interface MemoInputVariant {
    default: InputContainer
    error: InputContainer
    success: InputContainer
    disabled: InputContainer
}
export interface InputContainer {
    container: string
    input: string
    placeholder: string
}