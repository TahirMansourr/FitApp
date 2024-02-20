 import mongoose from 'mongoose'


 const workOutSchema = new mongoose.Schema({
    running : {
        type : Boolean
    },
    workout : [
        {type : String}
    ],
    caloriesBurnt : Number,
    createdAt : {
        type : Date,
        default : Date.now
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },


 })