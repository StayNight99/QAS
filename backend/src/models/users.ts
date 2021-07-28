import { model, Schema } from 'mongoose'

const UserSchema: Schema = new Schema(
    {
        _id: {
            type: Number,
            required: true
        },
        Name: {
            type: String,
            required: true
        },
        Passwd: {
            type: String,
            required: true
        },
        FollowPost_id: {
            type: Array,
            required: false
        }
    },
    {
        timestamps: true
    }
)

export default model("Users", UserSchema)