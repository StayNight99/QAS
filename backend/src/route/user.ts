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

/*
server.get('/user/:user_id', async (request: FastifyRequest, reply: FastifyReply) => {
        let param:any = request.params
        let user_id : number = param.user_id
        const user: IUsers = await Users.findById(user_id) as IUsers
        if(user === null)
        {
            return reply.status(404).send({ msg: "User Not Found" })
        }
    })
    
    //Put User Posts (param: userID,postID)
    server.put('/api/Ownposts/:user_id/:post_id', async (request: FastifyRequest, reply: FastifyReply) => {
        let param:any = request.params as any
        const users:IUsers = await Users.findById(param.user_id).exec() as IUsers
        if(users === null){
            return reply.status(404).send({msg: "User is not exist"})
        }
        else{
            const OwnPost_array:Array<string> = users.OwnPost_id as Array<string>
            let [Index,result] = await findInsertionPoint(OwnPost_array,param.post_id)

            if(result != false){
                let index:number = Index as number
                OwnPost_array.splice( index,0, parseInt(param.post_id) )
                OwnPost_array.sort( (a,b)=>a-b )
                users.save()
                return reply.status(200).send({ msg: 'put post successful' })
            }
            else{
                return reply.status(404).send({msg: "User have this post can be deleted"})
            }
        }
    })

    //Delete User Post (param: userID,postID)
    server.delete('/api/deleteOwn/:user_id/:post_id', async (request: FastifyRequest, reply:FastifyReply) =>{
        let param:any = request.params as any
        const users:IUsers = await Users.findById(param.user_id).exec() as IUsers
        if(users === null){
            return reply.status(404).send({msg: "User is not exist"})
        }
        else{
            const OwnPost_array:Array<number> = users.OwnPost_id as Array<number>
            let [Index,result] = await findInsertionPoint(OwnPost_array,param.post_id)
            if(result === false){
                let index:number = Index as number
                OwnPost_array.splice(index,1)
                users.save()
                return reply.status(200).send({ msg: 'delete users success!'})
            }
            else{
                return reply.status(404).send({msg: "the user does not exist"})
            }
        }
    })
*/