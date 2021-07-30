import { FastifyInstance } from 'fastify'
import { startFastify } from '../server'
import { Server, IncomingMessage, ServerResponse } from 'http'
import * as dbHandler from './db'
import { IQuestion } from './../types/question'
import { IUsers } from './../types/user'
import { IAnswer } from './../types/answer'
 
describe('API test', () => {
    let server: FastifyInstance<Server, IncomingMessage, ServerResponse>
    
    //跑測試前要做甚麼事
    beforeAll(async () => {
        await dbHandler.connect()
        server = startFastify(8888)
    })
    
    //每個測試跑完要做甚麼事
    afterEach(async () => {
        await dbHandler.clearDatabase()
    })
    
    //跑完所有測試要做甚麼事
    afterAll(async () => {
        try {
            // await dbHandler.closeDatabase()
            server.close((): void => { })
            console.log('Closing Fastify server is done!')
        } catch (e) {
            console.log(`Failed to close a Fastify server, reason: ${e}`)
        }
    })
 
    it('should successfully get a pong string', async () => {
        //const response = await server.inject({ method: 'GET', url: '/ping' })
        //expect(response.statusCode).toBe(200)
        //expect(response.body).toStrictEqual(JSON.stringify({ msg: 'pong' }))

        const res = await server.inject({ method: 'GET', url: '/question' })
        expect(res.statusCode).toBe(200)

        const res1 = await server.inject({
            method: 'POST',
            url: '/question/new',
            payload: {
                _id: 123,
                Questioner_id: 123,
                QuestionTitle: "Test case",
                Contents: "blablabla"
            }
        })
        expect(res1.statusCode).toBe(201)
        const res2: { Question: IQuestion } = JSON.parse(res1.body)
        expect(res2.Question._id).toBe(123)
        expect(res2.Question.Questioner_id).toBe(123)
        expect(res2.Question.QuestionTitle).toBe("Test case")
        expect(res2.Question.Contents).toBe("blablabla")

        const res3 = await server.inject({
            method: 'PUT',
            url: '/question/answer/new/123',
            payload: {
                _id: 12,
                User_id: 40,
                Content: "Test"
            }
        })
        expect(res3.statusCode).toBe(200)

        const res4 = await server.inject({ method: 'GET', url: '/question/answers/123' })
        expect(res4.statusCode).toBe(200)
        //expect(res2.body).toStrictEqual(JSON.stringify({ msg: "Failed"}))

        const res5 = await server.inject({ method: 'GET', url: '/question/answers/2048' })
        expect(res5.statusCode).toBe(404)
        expect(res5.body).toStrictEqual(JSON.stringify({ msg: "Question deosn't exist"}))

    })
})