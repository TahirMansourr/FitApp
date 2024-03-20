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
   participants : [{
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    progress : {type : Number , default : 0}
  }
   ],
   comments : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comments'
    }
   ],
   likes : Number,
   duration : {
    type : mongoose.Schema.Types.Mixed ,
    validate : function(value : number | string){
      return typeof value === "number" || typeof value === 'string'
    },
    message : 'Duration must be either free or a number'
  },
 
})

const Challenge = mongoose.models.Challenge || mongoose.model("Challenge" , challengeSchema)
export default Challenge;