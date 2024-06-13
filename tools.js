export const settings = {
    url: {
        todos: 'https://jsonplaceholder.typicode.com/todos',
        comments: 'https://jsonplaceholder.typicode.com/comments'
    },

    fetchLimit: {
        todos: 10,
        comments: 50
    },
    
    localStorage: {
        todos: 'db_todos',
        comments: 'db_comments'
    },
    
    cookies: {
        nohttp: 'nohttp',
        testhttp: "testhttp"
    }
}

/**
 * Fetch data from URL with options
 * @param {string} url
 * @returns {JSON}
 */
export async function fetchJSON(url, options={}) {
    const headers = {
        Accept: 'application/json', 
        ...options.headers
    }
    const r = await fetch(url, {...options, headers})
    if (r.ok) {
        return r.json()
    }
    throw new Error('Error server', {cause:r})
}

export async function fetchJSON_toModels(url, limits, localStorageName, callbackOnLoad, callbackOnError) {
    let strLimit = ""
    if (limits > 0) 
        strLimit = "?_limit=" + limits

    try {
        let objectList = []
        const objectDb = localStorage.getItem(localStorageName)?.toString()

        if (objectDb)
            objectList = JSON.parse(objectDb)
        else {
            console.log('First load of "'+url+'"')
            objectList = await fetchJSON(url + strLimit)
        }

        callbackOnLoad(objectList)
    } catch (e) {
        console.error(e)
        callbackOnError(e)
    }
}