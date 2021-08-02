import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Server, IncomingMessage, ServerResponse, request } from 'http'
import { establishConnection } from './plugins/mongodb'
import { IQuestion } from './types/question'
<<<<<<< HEAD

import Cat from './models/cat'
<<<<<<< HEAD
import Users from './models/users'
=======
import Users from './models/user'
import Question from './models/question'
>>>>>>> eadfe8691ee29f7ce3e76697a485bb217f9cd078
=======
import { IUsers } from './types/user'
import { findInsertionPoint } from './plugins/search'

import Cat from './models/cat'
import Users from './models/user'
import Question from './models/question'
import { number } from 'yargs'
>>>>>>> Nelson

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
=======
                _id: 1,
                Name: "Nelson",
                Passwd:"12345",
            },
            {
                _id: 2,
                Name: "Kevin",
                Passwd: "678910",
>>>>>>> Nelson
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
<<<<<<< HEAD
=======
=======
    //Create user api
    server.post('/CreateUsers', async (request: FastifyRequest, reply:FastifyReply) =>{
        const postBody: IUsers = request.body as IUsers
        const c_users = await Users.create(postBody)
        if(c_users === null){
            return reply.status(401).send({msg: "Create Users Failed"})
        }
        else{
            return reply.status(201).send({msg: "Create Users Successful"})
        }
    })
    
    //Put User Posts (param: userID,postID)
    server.put('/api/posts/:user_id/:post_id', async (request: FastifyRequest, reply: FastifyReply) => {
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
                await users.save()
                return reply.status(200).send({ msg: 'put post successful' })
            }
            else{
                return reply.status(404).send({msg: "User have this post can be deleted"})
            }
        }
    })

    //Delete User Post (param: userID,postID)
    server.delete('/api/delete/:user_id/:post_id', async (request: FastifyRequest, reply:FastifyReply) =>{
        let param:any = request.params
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
                await users.save()
                return reply.status(200).send({ msg: 'delete users success!'})
            }
            else{
                return reply.status(404).send({msg: "the user does not exist"})
            }
        }
    })

    //Modify User password
    server.put('/user/:user_id/:user_passwd', async(request: FastifyRequest,reply:FastifyReply) => {
        let param:any = request.params
        const result = await Users.findByIdAndUpdate(
        param.user_id,
            {
                'Passwd':param.user_passwd as string,
            }
        ).exec()

        if(result != null){
            return reply.status(200).send({ msg:'chage user password success! '})
        }
        else{
            return reply.status(200).send({ msg:'password change fail' })
        }
    })

    server.get('/getUsers', async (request: FastifyRequest, reply: FastifyReply) => {
        const users: Array<IUsers> = await Users.find()
        return reply.status(200).send({ users })
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
>>>>>>> Nelson
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
<<<<<<< HEAD

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
=======
        

        
>>>>>>> Nelson
    })

>>>>>>> eadfe8691ee29f7ce3e76697a485bb217f9cd078
    return server
}

export { startFastify }