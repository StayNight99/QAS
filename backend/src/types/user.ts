import { Document } from 'mongoose'

interface IUsers extends Document{
    _id: number
    Name : string
    Passwd: string
    OwnPost_id: Array<number>
    FollowPost_PK: Array<number>
}

export { IUsers }