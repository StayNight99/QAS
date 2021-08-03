import fastify, { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify'
import { IUsers } from './../types/user'
import Users from './../models/user'
import { UserRepoImpl } from '../repo/user-repo'

const UserRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

    const userRepo = UserRepoImpl.of()

    interface IdParams {
        user_id: string
    }

    server.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const user: Array<IUsers> = await userRepo.getUsers()
            return reply.status(200).send({msg: "Get Questions Success", user })
        }
        catch(error) {
            console.error(`GET /users Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    server.get<{ Params: IdParams }>('/users/:user_id', opts, async (request, reply: FastifyReply) => {
        try {
            const user_id : string = request.params.user_id
            const user: IUsers | null = await userRepo.getUser(user_id)
            if(user === null)
            {
                return reply.status(404).send({ msg: "User Not Found" })
            }
            else
            {
                return reply.status(200).send({ user })
            }
        }
        catch(error) {
            console.error(`GET /users Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    done()
}

export { UserRouter }