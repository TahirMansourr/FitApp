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
    runningDuration : Number,
    runningDistance: Number


 })

 const WorkOut = mongoose.models.WorkOut || mongoose.model("WorkOut" , workOutSchema)
export default WorkOut;