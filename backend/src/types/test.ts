import { Document } from 'mongoose'

interface Test extends Document{
    _id : number
    posts: string
}

export { Test }