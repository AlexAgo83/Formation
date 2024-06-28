import { useRef } from "react";

export function useRefSync(value) {
    const ref = useRef(value)
    ref.current = value
    return ref
}