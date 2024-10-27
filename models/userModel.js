import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    savedLike: {
        type: [String],
        default: [],
        required: false
    },
    verfied: {
        type: Boolean,
        default: false
    }
})



export const User = mongoose.model('user', userSchema);