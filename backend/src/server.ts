import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { establishConnection } from './plugins/mongodb'

import Cat from './models/cat'
import Login from './models/login'
import PostQuestion from './models/content'

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    logger: { prettyPrint: true }
})

const startFastify: (port: number) => FastifyInstance<Server, IncomingMessage, ServerResponse> = (port) => {

    server.register(require('fastify-cors'), {})
    
    server.listen(port, (err, _) => {
        if (err) {
            console.error(err)
            // process.exit(0)
        }
        establishConnection()
    })

    server.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send({ msg: 'pong' })
    })

    server.get('/cats', async (request: FastifyRequest, reply: FastifyReply) => {
        const cats = await Cat.find({}).exec()
        return reply.status(200).send({ cats })
    })

    server.post('/cats', async (request: FastifyRequest, reply: FastifyReply) => {
        const postBody = request.body
        const cat = await Cat.create(postBody)
        return reply.status(200).send({ cat })
    })

    //login api
    server.post('/loginData', async (request: FastifyRequest, reply: FastifyReply) => {
        const postBody = request.body
        const login = await Login.find({ postBody }).exec()
        if(login != null)
        {
            return reply.status(200).send({ msg: 'login success!' })
        }
        else
        {
            return reply.status(200).send({ msg: 'account or password incorrect!' })
        }
    })

    server.get('/content', async (request: FastifyRequest, reply: FastifyReply) => {
        const question = await PostQuestion.find({}).exec()
        return reply.status(200).send({ question })
    })

    server.post('/content', async (request: FastifyRequest, reply: FastifyReply) => {
        const postBody = request.body
        const question = await PostQuestion.find({ postBody }).exec()
        return reply.status(200).send({ question })
    })

    return server
}

export { startFastify }