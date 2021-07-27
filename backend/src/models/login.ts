import { model, Schema } from 'mongoose'

const loginSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        accountType:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default model("Login", loginSchema)