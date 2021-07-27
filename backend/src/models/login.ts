import { model, Schema } from 'mongoose'

const loginSchema: Schema = new Schema(
    {
        _id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default model("Login", loginSchema)