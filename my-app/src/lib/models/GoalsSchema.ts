import mongoose , { Schema, mongo } from 'mongoose'


const GoalSchema = new Schema({
  caloriesIn : Number,
  caloriesBurnt : Number,
  date : Date
})

const Goal = mongoose.models.Goal || mongoose.model("Goal" , GoalSchema)
export default Goal;