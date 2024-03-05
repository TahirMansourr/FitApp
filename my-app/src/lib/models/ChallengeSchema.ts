import mongoose , { Schema, mongo } from 'mongoose'

const challengeSchema = new Schema({
   name :{
    type: String,
    unique: true  // Ensures that each 'name' is unique
  },
   body : {
    type: String,
    unique: true  // Ensures that each 'name' is unique
  },
   isCompleted : Boolean,
   description : String,
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
   ],
   likes : Number
})

const Challenge = mongoose.models.Challenge || mongoose.model("Challenge" , challengeSchema)
export default Challenge;