import fastify, { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify'
import { IQuestion } from './../types/question'
import { IAnswer } from './../types/answer'
import Question from './../models/question'
import Answer from './../models/answer'

const AnswerRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

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

    done()
}

export { AnswerRouter }