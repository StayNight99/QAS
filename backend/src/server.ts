import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { establishConnection } from './plugins/mongodb'
import { QuestionRouter } from './route/question'
import { AnswerRouter } from './route/answer'
import { UserRouter } from './route/user'
import { IUsers } from './types/user'
import Users from './models/user'
import * as dbHandler from './test/db'

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    logger: { prettyPrint: true }
})

const startFastify: (port: number) => FastifyInstance<Server, IncomingMessage, ServerResponse> = (port) => {


    server.register(require('fastify-cors'), {})
    
    server.listen(port, (err, _) => {
        if (err) {
            console.error(err)
        }
        establishConnection()
        //dbHandler.clearDatabase()
        Users.create({
            Name: "Nelson",
            Passwd:"12345",
        })
        Users.create({
            Name: "Kevin",
            Passwd: "678910",
        })
        Users.create({
            Name: "Daniel",
            Passwd: "1234",
        })
    })

    server.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
        return reply.status(200).send({ msg: 'pong' })
    })

    //login api
    server.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
        const postBody: IUsers = request.body as IUsers
        const login: IUsers = await Users.findOne( {Name: postBody.Name, Passwd: postBody.Passwd} ).exec() as IUsers
        if(login === null){
            return reply.status(200).send({ msg: 'login error!' })
        }
        else
        {
            return reply.status(200).send({ msg: 'login success!' , login})
        }
    })

    server.register(QuestionRouter)
    server.register(AnswerRouter)
    server.register(UserRouter)

    return server
}

export { startFastify }