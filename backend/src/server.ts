import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { establishConnection } from './plugins/mongodb'
import { QuestionRouter } from './route/question'
import { AnswerRouter } from './route/answer'
import { UserRouter } from './route/user'
import { IUsers } from './types/user'
import { IAnswer } from './types/answer'
import { findInsertionPoint } from './plugins/search'

import Users from './models/user'
import Question from './models/question'
import Answer from './models/answer'
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
    })

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