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
    communities : [
        {
            type : String //mongoose.Schema.types.objectId
        }
    ],
    challenges : [{
        type : String //mongoose.Schema.types.objectId
    }],
    trophies : [{
        type : String
    }]

})

//create a model for the schema
const User = mongoose.models.User || mongoose.model("User" , userSchema)
export default User;