/**
 * @param {boolean} condition 
 * @param {string} className 
 */
export function activeClassIf(condition, className) {
    return condition ? className + " active" : className
}