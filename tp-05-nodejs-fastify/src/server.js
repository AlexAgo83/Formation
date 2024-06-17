import fastify from 'fastify'
import fastifyView from '@fastify/view'
import fastifyStatic from '@fastify/static'
import fastifyFormBody from '@fastify/formbody'

import ejs from 'ejs'

import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

import { getAllPosts, getPostById } from "./database.js"
import { RecordNotFoundError } from './errors/RecordNotFoundError.js'
import { loginAction, logoutAction } from './auth.js'


// const app = Fastify({
//     logger: true
// })
const app = fastify()
const _rootDir = dirname(fileURLToPath(import.meta.url))
const _publicPath = join(_rootDir, '../public')

app.register(fastifyView, {
    engine: {
        ejs
    }
})
app.register(fastifyFormBody)
app.register(fastifyStatic, {
    root: _publicPath
})

// fastify.get('/', (request, reply) => {
//     reply.send({hello: 'world'})
// })

app.get('/', (req, res) => {
    const element1 = {
        title: "Mon titre"
    }

    const element2 = [
        {content: "titre 1"},
        {content: "titre 2"},
        {content: "titre 3"},
        {content: "titre 4"},
        {content: "titre 5"}]



    res.view('templates/index.ejs', {
        element1,
        element2
    })
})

app.get('/posts', (req, res) => {
    let element3 = []
    getAllPosts().forEach(element => {
        element3.push({content: element.title + ": " + element.content})
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

// fastify.listen({port: 3000}, (err, adress) => {
//     if (err) throw err
// })

const start = async() => {
    try {
        await app.listen({port: 3000})
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
start()