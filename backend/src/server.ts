import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { establishConnection } from './plugins/mongodb'
import { IQuestion } from './types/question'

import Cat from './models/cat'
<<<<<<< HEAD
import Users from './models/users'
=======
import Users from './models/user'
import Question from './models/question'
>>>>>>> eadfe8691ee29f7ce3e76697a485bb217f9cd078

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
    logger: { prettyPrint: true }
})

const startFastify: (port: number) => FastifyInstance<Server, IncomingMessage, ServerResponse> = (port) => {

    server.register(require('fastify-cors'), {})
    
    server.listen(port, (err, _) => {
        if (err) {
            console.error(err)
            process.exit(0)
        }
        establishConnection()
        const users = new Users([
            {
<<<<<<< HEAD
            _id: 1,
            Name: "Nelson",
            Passwd:"12345",
            },
            {
            _id: 2,
            Name: "Kevin",
            Passwd: "678910",
=======
                _id: 1,
                Name: "Nelson",
                Passwd:"12345",
            },
            {
                _id: 2,
                Name: "Kevin",
                Passwd: "678910",
>>>>>>> eadfe8691ee29f7ce3e76697a485bb217f9cd078
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

<<<<<<< HEAD
=======
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

    //QuestionsListPage需要從DB中取出所有的問題用於顯示於列表之中
    //Input : null
    //Output : post(Schema)
    server.get('/getAllPost', async (request: FastifyRequest, reply: FastifyReply) => {
        const question: Array<IQuestion> = await Question.find()
        return reply.status(200).send({ question })
    })

    //個別問題頁面，需要顯示出該問題底下所有的回覆，和該回覆者的Name
    //Input : QuestionPK
    //Output : Answer(Schema)/Name
    server.get('/getAnswerByQuestionPK', async (request: FastifyRequest, reply: FastifyReply) => {
        
    })

    //透過UserPK查詢到使用者的Name
    //Input : UserPK
    //Output : Name
    server.get('/getNameByUserPk', async (request: FastifyRequest, reply: FastifyReply) => {
        
    })

    //使用者發問問題，需要新增問題相關資訊至資料庫
    //Input : UserPK、Contents、Question Type
    //Output : success/fall
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

    //使用者回覆問題，需要新增回覆相關資訊至資料庫
    //Input : UserPK、QuestionPK、Contents、Question Type
    //Output : success/fall
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

>>>>>>> eadfe8691ee29f7ce3e76697a485bb217f9cd078
    return server
}

export { startFastify }