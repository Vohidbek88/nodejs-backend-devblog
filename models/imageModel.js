import mongoose, { Schema } from "mongoose";

const ImageSchema = new Schema({
    image: {
        type: String,
        required: true
    },
})

export const Image = mongoose.model('image', ImageSchema);