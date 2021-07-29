import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { establishConnection } from './plugins/mongodb'
import { IQuestion } from './types/question'
import { IUsers } from './types/user'
import { IAnswer } from './types/answer'

import Answer from './models/answer'
import Cat from './models/cat'
import Users from './models/user'
import Question from './models/question'

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
        const users = new Users([
            {
                _id: 1,
                Name: "Nelson",
                Passwd:"12345",
            },
            {
                _id: 2,
                Name: "Kevin",
                Passwd: "678910",
            }
        ],)
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
        const login = await Users.find({ postBody }).exec()
        if(login != null)
        {
            return reply.status(200).send({ msg: 'login success!' })
        }
        else
        {
            return reply.status(200).send({ msg: 'account or password incorrect!' })
        }
    })

    //question api
    server.get('/getAllPost', async (request: FastifyRequest, reply: FastifyReply) => {
        const question: Array<IQuestion> = await Question.find()
        return reply.status(200).send({ question })
    })

    server.post('/setNewQuestionToDB', async (request: FastifyRequest, reply: FastifyReply) => {
        const postBody: IQuestion = request.body as IQuestion
        const question = await Question.create(postBody)
        if(question === null)
        {
            return reply.status(201).send({msg: "Create Question Failed"})
        }
        else
        {
            return reply.status(201).send({ question })
        }
    })
    server.post('/setNewAnswerToDB', async (request: FastifyRequest, reply: FastifyReply) => {
        const postBody: IQuestion = request.body as IQuestion
        const question = await Question.create(postBody)
        if(question === null)
        {
            return reply.status(201).send({msg: "Create Question Failed"})
        }
        else
        {
            return reply.status(201).send({ question })
        }
    })
    //[測試] loginPage一般帳號密碼登入
    //Input : account/password
    //Output : msg/userInfo
    server.get('/loginData/:account/:password', async (request: FastifyRequest, reply: FastifyReply) => {
        let param:any = request.params
        let account = param.account
        let password = param.password
        console.log(account);
        console.log(password);

        if(account === 'Daniel' && password === '1234')
        {
            return reply.status(200).send({ msg: 'login success!' })
        }
        else if(account === 'Daniel' && password != '1234')
        {
            return reply.status(200).send({ msg: 'password incorrect!' })
        }
        else
        {
            return reply.status(200).send({ msg: 'account not exist!' })
        }
        

        
    })

    return server
}

export { startFastify }