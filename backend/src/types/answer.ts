import { Document } from 'mongoose'

interface IAnswer extends Document{
    User_id: number
    Contents: string
    Scoring: Array<number>
}

export { IAnswer }