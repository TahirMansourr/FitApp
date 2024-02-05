 type PersonalRecord = Object[]

 type traininghistory = {
    run : boolean,
    runningDuration : number,
    runningDistance : number,
    workout : string[],
    todayWorkout : (string | number)[]
    caloriesBurnt: number,
    date : Date

  }
 
 export const PersonalRecordsArray : PersonalRecord = [
    { Chest  : '110 KG'},
    { Deadlift : ' 200 kg'},
    { Biceps : '30 KG'},
    { Running : '12 KM'},
    { Squats : '200 KG'}  
 ]

 export const ChallengesArray  = [
    {
        title : "Core Challenge",
        description : 'extreme core challenge' ,
        content : "100 days core challenge"
    } ,
    {
        title : "Back Destroyer",
        description : 'extreme back challenge' ,
        content : "100 days back challenge"
    } ,
    {
        title : "Super Chest",
        description : 'extreme Chest challenge' ,
        content : "100 days Chest challenge"
    } ,
    {
        title : "Squat Master",
        description : 'extreme Leg challenge' ,
        content : "100 days Leg challenge"
    } ,
]

export const TrainingHistory :traininghistory[] = [
]