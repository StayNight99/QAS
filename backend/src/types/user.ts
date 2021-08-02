<<<<<<< HEAD
import { Document } from 'mongoose'

interface IUsers extends Document{
    Name: string
    Passwd: string
    OwnPost_id: Array<number> 
    FollowPost_id: Array<number>
}

=======
import { Document } from 'mongoose'

interface IUsers extends Document{
    _id: number
    Name : string
    Passwd: string
    OwnPost_id: Array<number>
    FollowPost_PK: Array<number>
}

>>>>>>> Nelson
export { IUsers }