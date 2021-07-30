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

    //[測試] loginPage一般帳號密碼登入
    //Input : account、password
    //Output : loginMsg(login success! / password incorrect! / account not exist!) 、 User(Schema)
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

    //question api
    server.get('/question', async (request: FastifyRequest, reply: FastifyReply) => {
        const question: Array<IQuestion> = await Question.find()
        return reply.status(200).send({ question })
    })

    server.get('/answer', async (request: FastifyRequest, reply: FastifyReply) => {
        const answer: Array<IAnswer> = await Answer.find()
        return reply.status(200).send({ answer })
    })

    server.get('/question/:Question_id', async (request: FastifyRequest, reply: FastifyReply) => {
        let param:any = request.params
        let Question_id : number = param.Question_id
        const question: IQuestion = await Question.findById(Question_id) as IQuestion
        if(question === null)
        {
            return reply.status(404).send({msg: "Question Not Found"})
        }
        else
        {
            return reply.status(200).send({ question })
        }
    })

    server.get('/question/answers/:Question_id', async (request: FastifyRequest, reply: FastifyReply) => {
        let param:any = request.params
        let Question_id : number = param.Question_id
        const question: IQuestion = await Question.findById(Question_id) as IQuestion
        if(question === null)
        {
            return reply.status(404).send({msg: "Question Not Found"})
        }
        else
        {
            let size = question.Answer.length;
            if(size === 0)
            {
                return reply.status(400).send({ msg: "Failed"})
            }
            else
            {
                let answer: Array<IAnswer> = [{
                    _id: 0,
                    User_id: 0,
                    Contents: "Initial"
                } as IAnswer]
                answer.pop()
                for (var val of question.Answer) {
                    answer.push(await Answer.findById(val) as IAnswer)
                }
                return reply.status(200).send({ answer })
            }
        }
    })

    server.post('/question/new', async (request: FastifyRequest, reply: FastifyReply) => {
        const postBody: IQuestion = request.body as IQuestion
        const question = await Question.create( postBody )
        if(question === null)
        {
            return reply.status(201).send({msg: "Create Question Failed"})
        }
        else
        {
            return reply.status(201).send({ question })
        }
    })

    server.put('/question/answer/new/:Question_id', async (request: FastifyRequest, reply: FastifyReply) => {
        let param:any = request.params
        let Question_id = param.Question_id
        let question: IQuestion = await Question.findById(Question_id).exec() as IQuestion
        if(question === null)
        {
            return reply.status(404).send({msg: "Question Not Found"})
        }
        else
        {
            const postBody: IAnswer = request.body as IAnswer
            const answer = await Answer.create(postBody)
            if(answer === null)
            {
                return reply.status(400).send({msg: "Create Answer Failed"})
            }
            else
            {
                question.Answer.push(answer._id)
                await question.save()
                return reply.status(200).send({ answer })
            }
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