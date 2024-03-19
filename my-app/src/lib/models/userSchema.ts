
import mongoose , { Schema } from 'mongoose'

const userSchema = new mongoose.Schema({
    id : {
        type : String,
        required : true
    },
    username : {
        type : String,
        lowercase : true,
        required : true
    },
    bio : String,
    image : String,
    age : Number,
    Weight : Number,
    Height : Number,
    status : String, // this is to show if he is a coach or a personal trainer or whatever
    communities : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Communities'
        }
    ],
    challenges : [{

          theChallenge :  {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Challenges'
        },
          participatedAt : {
           type : Date
          }
    }],
    trophies : [{
        type :mongoose.Schema.Types.ObjectId,
        ref : 'Trophy'
    }],
    onBoarded : {
        type : Boolean,
        default : false
    },
    Posts : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }
    ],
    workouts : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "WorkOut"
        }
    ],
    diet : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Diet"
        }
    ],
    createdChallenges : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Challenges'
    }],
    followers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    following : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    completedChallenges : [{
        theChallenge :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Challenges'
        },
        completedAt : {
            type : Date
        }
    }],
    sport : String,
    position : String


})

//create a model for the schema
const User = mongoose.models.User || mongoose.model("User" , userSchema)
export default User;