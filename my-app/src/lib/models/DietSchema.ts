import mongoose , { Schema } from 'mongoose'

const Diet = new Schema({
    meals : [
        {
            name : String,
            calories : Number,
            time : Date
        }
    ],
    totalCalories : Number,
    
})