import { useState } from "react"

export function useIncrement({base = 0, min = 0, max = 10}) {
    const [state, setState] = useState(base)
    return [
        state,
        () => setState(v => (v < max) ? v + 1 : v),
        () => setState(v => (v > min) ? v - 1 : v)
    ]
}