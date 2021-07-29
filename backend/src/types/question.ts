import { Document } from 'mongoose'

interface IQuestion extends Document{
    _id: number
    QuestionerId: number
    Content: string
    QuestionType: string
    AnswerScore: number
}

export { IQuestion}