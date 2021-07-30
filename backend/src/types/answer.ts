import { Document } from 'mongoose'

interface IAnswer extends Document{
    _id: number
    User_id: number
    Contents: string
    Scoring: Array<number>
}

export { IAnswer }