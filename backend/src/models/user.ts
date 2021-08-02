import { IUsers } from '../types/user'
import { model, Schema } from 'mongoose'

const UserSchema: Schema = new Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Passwd: {
            type: String,
            required: true
        },
        OwnPost_id: {
            type: Array,
            required: false
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

export default model<IUsers>("Users", UserSchema)