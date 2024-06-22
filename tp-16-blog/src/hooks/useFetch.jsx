import { useEffect, useState } from "react"

const emptyObject = {}

/**
 * @param {string} url 
 * @param {FetchEventInit} options 
 */
export function useFetch (url, options = emptyObject) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {  
        fetch(url, {
            ...options,
            headers: {
                'Accept': 'application/json; charset=utf-8',
                ...options?.headers
            }
        }).then(r => r.json()).then(data => {
            setData(data)
        }).catch((e) => {
            setError(e)
        }).finally(() => {
            setLoading(false)
        })
    }, [url, options])

    return {
        loading,
        data,
        error: error
    }
}