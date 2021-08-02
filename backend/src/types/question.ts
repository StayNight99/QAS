import { Document } from 'mongoose'

interface IQuestion extends Document{
    Questioner_id: number
    QuestionTitle: string
    Contents: string
    Answer: Array<number>
    QuestionType: Array<string>
    AnswerScore: Array<number>
}
export { IQuestion }
