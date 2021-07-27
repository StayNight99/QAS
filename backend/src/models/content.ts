import { IPostQuestion } from './../types/content'
import { model, Schema } from 'mongoose'

const postQuestionSchema: Schema = new Schema(
    {
        _id: {
            type: Number,
            required: true
        },
        QuestionerId: {
            type: Number,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        QuestionType:{
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

export default model<IPostQuestion>("PostQuestion", postQuestionSchema)