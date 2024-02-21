
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
    communities : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Communities'
        }
    ],
    challenges : [{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Challenges'
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
    ]

})

//create a model for the schema
const User = mongoose.models.User || mongoose.model("User" , userSchema)
export default User;