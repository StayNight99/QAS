import { model, Schema } from 'mongoose'

const catSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default model("Cat", catSchema)