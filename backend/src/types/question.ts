import { Document } from 'mongoose'
import { IAnswer } from './answer'

interface IQuestion extends Document{
    _id: number
    Questioner_id: number
    QuestionTitle: string
    Contents: string
    Answer: Array<number>
    QuestionType: Array<string>
    AnswerScore: Array<number>
}

export { IQuestion }