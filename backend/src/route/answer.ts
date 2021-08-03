import { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify'
import { IQuestion } from './../types/question'
import { IAnswer } from './../types/answer'
import { QuestionRepoImpl } from '../repo/question-repo'
import { AnswerRepoImpl } from '../repo/answer-repo'

const AnswerRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {

    const answerRepo = AnswerRepoImpl.of()
    const questionRepo = QuestionRepoImpl.of()

    interface IdParams {
        Question_id: string
    }

    //create new answer for this question
    server.put<{ Params: IdParams }>('/question/:Question_id/answer', opts, async (request, reply: FastifyReply) => {
        try {
            const question_id = request.params.Question_id
            const question: IQuestion | null = await questionRepo.getQuestion(question_id)
            if(question === null)
            {
                return reply.status(404).send({msg: "Question Not Found"})
            }
            else
            {
                try {
                    const postBody: IAnswer = request.body as IAnswer
                    const answer = await answerRepo.addAnswer(postBody)
                    if(answer === null)
                    {
                        return reply.status(400).send({msg: "Create Answer Failed"})
                    }
                    else
                    {
                        try {
                            question.Answer.push(answer._id)
                            await question.save()
                            return reply.status(200).send({msg: "Create Answer Success", answer })
                        }
                        catch(error) {
                            console.error(`PUT /answer/:Question_id/answer Error: ${error}`)
                            return reply.status(500).send(`[Server Error]: ${error}`)
                        }
                    }
                }
                catch(error) {
                    console.error(`POST /questions/:Question_id Error: ${error}`)
                    return reply.status(500).send(`[Server Error]: ${error}`)
                }
            }
        }
        catch(error) {
            console.error(`GET /questions Error: ${error}`)
            return reply.status(500).send(`[Server Error]: ${error}`)
        }
    })

    done()
}

export { AnswerRouter }