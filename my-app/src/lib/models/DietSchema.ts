import mongoose , { Schema } from 'mongoose'

const DietSchema = new Schema({
    meals : [
        {
            meal : String,
            calories : Number,
            time : {
                type : Date,
                default : Date.now
            }
        }
    ],
    totalCalories : Number,
    
})


const Diet = mongoose.models.Diet || mongoose.model("Diet" , DietSchema)
export default Diet;