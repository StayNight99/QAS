import { IQuestion } from '../types/question'
import { model, Schema } from 'mongoose'

const QuestionSchema: Schema = new Schema(
    {
        _id: {
            type: Number,
            required: true
        },
        Questioner_id: {
            type: Number,
            required: true
        },
        Contents: {
            type: String,
            required: true
        },
        Questioner: {
            type: Array,
            required: true
        },
        QuestionType:{
            type: String,
            required: false
        },
        AnswerScore:{
            type: Number,
            required: false
        }
    },
    {
        timestamps: true
    }
)

export default model<IQuestion>("Question", QuestionSchema)