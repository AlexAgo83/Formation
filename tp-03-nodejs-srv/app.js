import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createReadStream } from 'node:fs'
import { createServer } from 'node:http'

const srcPath = dirname(fileURLToPath(import.meta.url))

// Chrome => http://127.0.0.1:8888/?name=toto
const server = createServer((req, res) => {
    const file = createReadStream(join(srcPath, 'index.html'))
    file.pipe(res)

    const url = new URL(req.url, `http://${req.headers.host}`)
    res.write(`Bonjour ${url.searchParams.get('name')}`)
    res.end()
})
server.listen('8888')