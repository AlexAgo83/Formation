import { useState } from "react"

export function useIncrement({
        base = 0, 
        step = 1,
        min = Infinity, 
        max = -Infinity}) {
    const [state, setState] = useState(base)
    return [
        state,
        () => setState(v => (v + step <= max) ? v + step : v),
        () => setState(v => (v - step >= min) ? v - step : v)
    ]
}