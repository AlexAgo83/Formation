import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createReadStream } from 'node:fs'
import { createServer } from 'node:http'
import { text, json } from 'node:stream/consumers'

const srcPath = dirname(fileURLToPath(import.meta.url))

// Chrome => http://127.0.0.1:8888/?name=toto
const server = createServer(async (req, res) => {
    const file = createReadStream(join(srcPath, 'index.html'))
    file.pipe(res)

    let namePrint
    // From URL PARAM
    const url = new URL(req.url, `http://${req.headers.host}`)
    const nameFromUrlParam = url.searchParams.get('name')
    if (nameFromUrlParam !== null) {       
        res.write(`Bonjour ${nameFromUrlParam}`)
        res.end()
    }

    // From HTTP Request GET 
    // { "test-name": "toto" }

    // Method 1
    // else {
    //     let body = ''
    //     req.on('data', (chunk) => {
    //         body += chunk
    //     })
    //     req.on('close', () => {
    //         console.log(body)
    //         res.write(body)
    //         res.end()
    //     })
    // }

    // Method 2
    else {
        // console.log(await text(req))
        const body = (await json(req)).name
        res.write(`Hello ${body} :D`)
        res.end()
    }
})
server.listen('8888')