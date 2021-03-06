import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { establishConnection } from './plugins/mongodb'
import { QuestionRouter } from './route/question'
import { AnswerRouter } from './route/answer'
import { UserRouter } from './route/user'
import { IUsers } from './types/user'
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
        //dbHandler.clearDatabase()

        //inital Data
        // Users.create({
        //     Name: "Nelson",
        //     Passwd:"12345",
        // })
        // Users.create({
        //     Name: "Kevin",
        //     Passwd: "678910",
        // })
        // Users.create({
        //     Name: "Daniel",
        //     Passwd: "1234",
        // })
        // Question.create({
        //         Questioner_id: "6108207646513f3a6c6ea07b",
        //         QuestionTitle: "How to programing by MERN stack",
        //         Contents: "so diffuclt!",
        //         Answer: ["6108216142bb6a20a0e48def","6108216142bb6a20a0e48df0"],
        //         QuestionType: ["React","TypeScript","MERN"],
        //         AnswerScore: ["2"]
        // })
        // Question.create({
        //         Questioner_id: "6108207646513f3a6c6ea07b",
        //         QuestionTitle: "jquery - cant move a list element back from the right side dunno why",
        //         Contents: "Is it easy?",
        //         Answer: [],
        //         QuestionType: ["Jquery","html","javascript"],
        //         AnswerScore: ["2","3"]
        // })
        // Question.create({
        //         Questioner_id: "6108207646513f3a6c6ea079",
        //         QuestionTitle: "How to sort command output in for loop before dumping to file?",
        //         Contents: "The most obvious method would be removing redirection >> and piping script output to sort.",
        //         Answer: ["2","5","7"],
        //         QuestionType: ["sorting","for-loop","shell"],
        //         AnswerScore: ["2","3"]
        // })
        // Answer.create({
        //     User_id: "6108207646513f3a6c6ea07b",
        //     Contents: "You can follow the step.",
        //     Scoring: []
        // })
        // Answer.create({
        //     User_id: "6108207646513f3a6c6ea07b",
        //     Contents: "You can do it.",
        //     Scoring: []
        // })
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