import { Document } from 'mongoose'

interface IPostQuestion extends Document{
    _id: number
    name: string
    password: string
}

export { IPostQuestion }