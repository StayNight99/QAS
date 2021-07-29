import { Document } from 'mongoose'
import { IAnswer } from './answer'

interface IQuestion extends Document{
    _id: number
    QuestionerId: number
    QuestionTitle: string
    Content: string
    Answer: Array<IAnswer>
    QuestionType: Array<string>
    AnswerScore: Array<number>
}

export { IQuestion }