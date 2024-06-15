import fastify from 'fastify'
import fastifyView from '@fastify/view'
import fastifyStatic from '@fastify/static'

import ejs from 'ejs'

import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

// const app = Fastify({
//     logger: true
// })
const app = fastify()
const _rootDir = dirname(fileURLToPath(import.meta.url))
const _publicPath = join(_rootDir, '../public')
console.log(_publicPath)

app.register(fastifyView, {
    engine: {
        ejs
    }
})
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