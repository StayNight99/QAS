import fastify, { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify'
import { IQuestion } from './../types/question'
import { IUsers } from './../types/user'
import Question from './../models/question'
import Users from './../models/user'
import { getUserName } from './../plugins/getUserName'

const QuestionRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

    //get all questions api
    server.get('/question', async (request: FastifyRequest, reply: FastifyReply) => {
        const question: Array<IQuestion> = await Question.find()
        let userName:Array<string> = []
        userName.pop()
        let user: IUsers = {} as IUsers
        //userName = await getUserName(question, user, userName)
        for(var val of question){
            user = await Users.findById(val.Questioner_id) as IUsers
            userName.push(user.Name)
        }
        return reply.status(200).send({msg: "Get Questions Success", question, userName })
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

    done()
}

export { QuestionRouter }