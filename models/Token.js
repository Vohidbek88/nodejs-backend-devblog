
import mongoose, { Schema } from "mongoose";

const SchemaToken=new Schema({
    userId:{
        type:String,
        ref:'user',
        required:true
    },
    token:{
        type:String,
        required:true
    }
})

const Token=mongoose.model('token',SchemaToken);

export default Token