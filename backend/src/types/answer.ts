import { Document } from 'mongoose'

interface IAnswer extends Document{
    User_id: number
    Content: string
    Scoring: Array<number>
}

export { IAnswer }