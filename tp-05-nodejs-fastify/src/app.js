import Fastify from 'fastify'

const fastify = Fastify({
    logger: true
})

// fastify.get('/', (request, reply) => {
//     reply.send({hello: 'world'})
// })

// fastify.listen({port: 3000}, (err, adress) => {
//     if (err) throw err
// })

const start = async() => {
    try {
        await fastify.listen({port: 3000})
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}
start()