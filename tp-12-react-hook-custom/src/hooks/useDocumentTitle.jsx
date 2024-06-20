import { useEffect, useRef } from "react"

export function useDocumentTitle(title) {
    const titelRef = useRef(document.title)
    useEffect(() => {
        return () => {
            document.title = titelRef.current
        }
    }, [])
    useEffect(() => {
        document.title = title ? title : titelRef.current
    }, [title])
}