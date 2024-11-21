
export function isNumeric(value: string | number | null | undefined): boolean {
    if (typeof value === 'number') return true
    if (!value) return false
    value = String(value)
    return !isNaN(Number(value)) && !isNaN(parseFloat(value))
}