import { Document } from 'mongoose'

interface IUsers extends Document{
    Name: string
    Passwd: string
    OwnPost_id: Array<number> 
    FollowPost_id: Array<number>
}

export { IUsers }