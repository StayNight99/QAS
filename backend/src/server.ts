import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { establishConnection } from './plugins/mongodb'
import { IQuestion } from './types/question'
import { IUsers } from './types/user'
import { IAnswer } from './types/answer'
import { findInsertionPoint } from './plugins/search'

import Answer from './models/answer'
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
            const OwnPost_array:Array<number> = users.OwnPost_id as Array<number>
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
        const postBody = request.body
        var login = await Users.find({postBody}).exec()

        let param:any = request.params
        let account = param.Name
        let password = param.Passwd

        if(true){
            return reply.status(200).send({ msg: 'login success!' , _id: '3'})
        }
        else
        {
            return reply.status(200).send({ msg: 'login error!' })
        }
    })



    //get all questions api
    server.get('/question', async (request: FastifyRequest, reply: FastifyReply) => {
        const question: Array<IQuestion> = await Question.find()
        return reply.status(200).send({msg: "Get Questions Success", question })
    })

    //get question api
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
            return reply.status(200).send({msg: "Get Question Success", question })
        }
    })

    //create new question
    server.post('/question/new', async (request: FastifyRequest, reply: FastifyReply) => {
        const postBody: IQuestion = request.body as IQuestion
        const question = await Question.create( postBody )
        if(question === null)
        {
            return reply.status(201).send({msg: "Create Question Failed"})
        }
        else
        {
            return reply.status(201).send({ msg: "Create Question Success", question })
        }
    })

    //get all answers api
    server.get('/answer', async (request: FastifyRequest, reply: FastifyReply) => {
        const answer: Array<IAnswer> = await Answer.find()
        return reply.status(200).send({msg: "Get Answers Success", answer })
    })

    // get all answers for this question
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
                return reply.status(400).send({ msg: "No Answer Exist"})
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
                return reply.status(200).send({msg: "Get Answers Success", answer })
            }
        }
    })

    //create new answer for this question
    server.post('/question/new', async (request: FastifyRequest, reply: FastifyReply) => {
        const postBody: IQuestion = request.body as IQuestion
        const question = await Question.create( postBody )
        if(question === null)
        {
            return reply.status(201).send({msg: "Create Question Failed"})
        }
        else
        {
            return reply.status(201).send({msg: "Create Question Success" , question })
        }
    })

    server.put('/question/answer/new/:Question_id', async (request: FastifyRequest, reply: FastifyReply) => {
        let param:any = request.params
        let question_id = param.Question_id
        let question: IQuestion = await Question.findById(question_id).exec() as IQuestion
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
                return reply.status(200).send({msg: "Create Answer Success", answer })
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