import { IAnswer } from '../types/answer'
import { model, Schema } from 'mongoose'

const AnswerSchema: Schema = new Schema(
    {
        User_id: {
            type: String,
            required: true
        },
        Contents: {
            type: String,
            required: true
        },
        Scoring: {
            type: Array,
            required: false
        }
    },
    {
        timestamps: true
    }
)

export default model<IAnswer>("Answer", AnswerSchema)