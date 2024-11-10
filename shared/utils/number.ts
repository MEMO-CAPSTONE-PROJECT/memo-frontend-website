
export function isNumeric(value: any){
    if (typeof value === 'number') return true
    if (!value) return false
    value = "" + value; //coerce num to be a string
    return !isNaN(value) && !isNaN(parseFloat(value))
}