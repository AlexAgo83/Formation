import fastify from 'fastify'
import fastifyView from '@fastify/view'
import fastifyStatic from '@fastify/static'
import fastifyFormBody from '@fastify/formbody'
import fastifySecureSession from '@fastify/secure-session'

import ejs from 'ejs'

import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

import { getAllPosts, getPostById } from "./database.js"
import { RecordNotFoundError } from './errors/RecordNotFoundError.js'
import { loginAction, logoutAction } from './auth.js'
import { readFileSync } from 'node:fs'


// const app = Fastify({
//     logger: true
// })
const app = fastify()
const _rootDir = dirname(fileURLToPath(import.meta.url))
const _publicPath = join(_rootDir, '../public')
const _sessionKey = join(_rootDir, '../secret-key')

app.register(fastifyView, {
    engine: {
        ejs
    }
})

app.register(fastifySecureSession, {
    sessionName: 'sessionCookie',
    // key: readFileSync(_sessionKey),
    secret: 'averylogphrasebiggerthanthirtytwochars',
    salt: 'mq9hDxBVDbspDR6n',
    cookie: {
        path: '/'
    }
})

app.register(fastifyFormBody)
app.register(fastifyStatic, {
    root: _publicPath
})

app.get('/', (req, res) => {
    const user = req.sessionCookie.get('user')
    const element1 = {
        title: "Mon titre"
    }

    const element2 = [
        { content: "titre 1" },
        { content: "titre 2" },
        { content: "titre 3" },
        { content: "titre 4" },
        { content: "titre 5" }]

    res.view('templates/index.ejs', {
        element1,
        element2,
        user
    })
})

app.get('/posts', (req, res) => {
    let element3 = []
    getAllPosts().forEach(element => {
        element3.push({ content: element.title + ": " + element.content })
    });
    res.view('templates/index.ejs', {
        element3
    })
})

app.get('/post/:id', (req, res) => {
    const element4 = getPostById(req.params.id)
    res.view('templates/index.ejs', {
        element4
    })
})

/**
 * Error HANDLER
 */
app.setErrorHandler((error, req, res) => {
    const errorMsg = {
        error: error.message
    }
    if (error instanceof RecordNotFoundError) {
        res.statusCode = 404
        res.view('templates/404.ejs', errorMsg)
    } else {
        res.statusCode = 500
        console.error(error)
        return errorMsg
    }
})

app.get("/login", loginAction)
app.post("/login", loginAction)
app.get("/logout", logoutAction)
app.post("/logout", logoutAction)

// fastify.listen({port: 3000}, (err, adress) => {
//     if (err) throw err
// })

const start = async () => {
    try {
        await app.listen({ port: 3000 })
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
start()