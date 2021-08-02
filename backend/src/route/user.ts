import fastify, { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify'
import { IUsers } from './../types/user'
import Users from './../models/user'

const UserRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

    server.get('/user', async (request: FastifyRequest, reply: FastifyReply) => {
        const user: Array<IUsers> = await Users.find()
        return reply.status(200).send({msg: "Get Questions Success", user })
    })

    server.get('/user/:user_id', async (request: FastifyRequest, reply: FastifyReply) => {
        let param:any = request.params
        let user_id : number = param.user_id
        const user: IUsers = await Users.findById(user_id) as IUsers
        if(user === null)
        {
            return reply.status(404).send({ msg: "User Not Found" })
        }
        else
        {
            return reply.status(200).send({ user })
        }
    })

    done()
}

export { UserRouter }