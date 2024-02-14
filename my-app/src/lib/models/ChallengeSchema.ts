import mongoose , { Schema, mongo } from 'mongoose'

const challengeSchema = new Schema({
   name : String,
   body : String,
   createdAt : {
    type : Date , 
    default : Date.now()
   },
   createdBy : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
   },
   participants : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
   ],
   comments : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comments'
    }
   ]
})

const Challenge = mongoose.models.Challenge || mongoose.model("Challenge" , challengeSchema)
export default Challenge;