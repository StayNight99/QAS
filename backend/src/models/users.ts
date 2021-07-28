import { model, Schema } from 'mongoose'

const userSchema: Schema = new Schema(
    {
        _id: {
            type: Number,
            required: true
        },
        Name: {
            type:String,
            required: true
        },
        Passwd: {
            type:String,
            required: true
        }
    }
)

export default model("Users",userSchema)