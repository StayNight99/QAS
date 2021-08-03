import { Document } from 'mongoose'

interface IUsers extends Document{
    Name: string
    Passwd: string
    OwnPost_id: Array<string> 
    FollowPost_id: Array<string>
}

export { IUsers }