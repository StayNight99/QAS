import { Document } from 'mongoose'

interface IQuestion extends Document{
    Questioner_id: string
    QuestionTitle: string
    Contents: string
    Answer: Array<string>
    QuestionType: Array<string>
    AnswerScore: Array<string>
}
export { IQuestion }
