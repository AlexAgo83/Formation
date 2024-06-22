import { useEffect, useState } from "react"
import { useRefSync } from "./useRefSync"

const emptyObject = {}

/**
 * @param {string} url 
 * @param {FetchEventInit} options 
 */
export function useFetch (url, options = emptyObject) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const optionsRef = useRefSync(options)

    useEffect(() => {  
        fetch(url, {
            ...optionsRef,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                ...optionsRef?.headers
            }
        }).then(r => r.json()).then(data => {
            setData(data)
        }).catch((e) => {
            setError(e)
        }).finally(() => {
            setLoading(false)
        })
    }, [url, optionsRef])

    return {
        loading,
        data,
        error,
        setData,
    }
}