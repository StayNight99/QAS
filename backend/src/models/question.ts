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
        QuestionTitle: {
            type: String,
            required: true
        },
        Contents: {
            type: String,
            required: true
        },
        Answer: {
            type: Array,
            required: false
        },
        QuestionType:{
            type: Array,
            required: false
        },
        AnswerScore:{
            type: Array,
            required: false
        }
    },
    {
        timestamps: true
    }
)

export default model<IQuestion>("Question", QuestionSchema)