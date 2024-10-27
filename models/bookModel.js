import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        }
        ,
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: String,
            required: true
        },
        email: {
            type: String,
        },
        status: {
            type: Boolean,
            default: false
        },
        likecount: {
            type: Number,
            default: 0,
            required: false
        },
        imageObject:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }

)

export const Book = mongoose.model('bookstore', bookSchema);