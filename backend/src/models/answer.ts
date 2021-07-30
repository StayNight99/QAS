import { IAnswer } from '../types/answer'
import { model, Schema } from 'mongoose'

const AnswerSchema: Schema = new Schema(
    {
        _id: {
            type: Number,
            required: true
        },
        User_id: {
            type: Number,
            required: true
        },
        Contents: {
            type: String,
            required: true
        },
        Scoring:{
            type: Array,
            required: false
        }
    },
    {
        timestamps: true
    }
)

export default model<IAnswer>("Answer", AnswerSchema)