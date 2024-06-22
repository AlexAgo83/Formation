import { useEffect, useState } from "react";

/**
 * @returns {Object}  { page: string, param: string }
 */
export function useHashNavigation() {
    const [hash, setHash] = useState(location.hash)

    useEffect(() => {
        const handleHashChange = () => {
            setHash(location.hash)
        }
        window.addEventListener('hashchange', handleHashChange)
        return () => window.removeEventListener('hashchange', handleHashChange)
    }, []);

    const cleanedHash = hash.replace('#', '').toLowerCase()
    return {
        page: cleanedHash ? cleanedHash.split(':')[0] : 'home',
        param: cleanedHash ? cleanedHash.split(':')[1] : undefined
    }
}