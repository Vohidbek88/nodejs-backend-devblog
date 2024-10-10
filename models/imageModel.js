import mongoose, { Schema } from "mongoose";

const ImageSchema = new Schema({
    image: {
        data: Buffer,
        contentType:String,
    },
})

export const Image = mongoose.model('image', ImageSchema);