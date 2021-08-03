import fastify, { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify'
import { IQuestion } from './../types/question'
import { IAnswer } from '../types/answer'
import { IUsers } from './../types/user'
import { QuestionRepoImpl } from '../repo/question-repo'
import { AnswerRepoImpl } from '../repo/answer-repo'
import { UserRepoImpl } from '../repo/user-repo'
import Answer from '../models/answer'
import Users from '../models/user'
import { getUserName } from './../plugins/getUserName'

const QuestionRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

    const questionRepo = QuestionRepoImpl.of()
    const answerRepo = AnswerRepoImpl.of()
    const userRepo = UserRepoImpl.of()

    interface IdParams {
        Question_id: string
    }

    //get all questions api
    server.get('/questions', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const question: Array<IQuestion> = await questionRepo.getQuestions()
            const userName = await Promise.all(question.map(async(item) => {
                const user: IUsers | null = await userRepo.getUser(item.Questioner_id)
                if(user != null)
                {
                    return user.Name
                }
            }))
            return reply.status(200).send({msg: "Get Questions Success", question, userName })
        }
        catch(error) {
            console.error(`GET /question Error: $(error)`)
            return reply.status(500).send(`[Server Error]: $(error)`)
        }
    })

    //get question api
    server.get<{ Params: IdParams }>('/questions/:Question_id', opts, async (request, reply: FastifyReply) => {
        try {
            const Question_id : string = request.params.Question_id
            const question: IQuestion | null = await questionRepo.getQuestion(Question_id)
            if(question === null)
            {
                return reply.status(404).send({msg: "Question Not Found"})
            }
            else
            {
                if(question.Answer.length === 0)
                {
                    return reply.status(400).send({ msg: "No Answer Exist"})
                }
                else
                {
                    const answer = await Promise.all(question.Answer.map(async(item) => await answerRepo.getAnswer(item)))
                    const userName = await Promise.all(answer.map(async(item) => {
                        if(item != null)
                        {
                            const user: IUsers | null = await userRepo.getUser(item.User_id)
                            if(user != null)
                            {
                                return user.Name
                            }
                        }
                        else    
                        {
                            return null
                        }
                    }))
                    return reply.status(200).send({msg: "Get Answers Success", question, answer, userName})
                }
            }
        }
        catch(error) {
            console.error(`GET /answer Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    //create new question
    server.post('/questions', async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const postBody: IQuestion = request.body as IQuestion
            const question: IQuestion | null = await questionRepo.addQuestion( postBody )
            if(question === null)
            {
                return reply.status(201).send({msg: "Create Question Failed"})
            }
            else
            {
                return reply.status(201).send({msg: "Create Question Success", question})
            }
        }
        catch(error) {
            console.error(`POST /question Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    done()
}

export { QuestionRouter }