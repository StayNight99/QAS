import { Document } from 'mongoose'

interface IAnswer extends Document{
    User_id: string
    Contents: string
    Scoring: Array<string>
}

export { IAnswer }