<<<<<<< HEAD
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
