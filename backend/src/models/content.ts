import { model, Schema } from 'mongoose'

const postQuestionSchema: Schema = new Schema(
    {
        QuestionerName: {
            type: String,
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

export default model("PostQuestion", postQuestionSchema)