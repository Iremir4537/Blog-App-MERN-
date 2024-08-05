import mongoose, { mongo } from "mongoose"

const userSchema = new mongoose.Schema({
    username: {type:String,required:true,min:4,unique:true,trim:true},
    password:{type:String,required:true}
})

export default mongoose.model('User',userSchema)