<<<<<<< HEAD
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
=======
import { Document } from 'mongoose'

interface IQuestion extends Document{
    _id: number
    QuestionerId: number
    Content: string
    QuestionType: string
    AnswerScore: number
}

export { IQuestion}
>>>>>>> Nelson
