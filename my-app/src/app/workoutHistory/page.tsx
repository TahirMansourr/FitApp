'use client'
import RenderBarChart from '@/components/barChart'
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getDaysOfTheWeek } from './dateComponent'
import {format} from 'date-fns'
import { TrainingHistory } from '@/DTO'
import { areDatesEqual } from './dateComponent'
import { getworkout } from '@/lib/actions/workOutActions/getworkouts'

interface diet{
    id : string,
    meals : {
        meal : string,
        time : Date,
        calories : number
    }[]
}
const WorkOutHistory = () => {

    const [response , setResponse] = useState<any[]>()
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [isDrawer , setIsDrawer] = useState(false)
    const [isBlurred, setIsBlurred] = useState(false); // State to manage blur effect
    const [weekDays , setWeekDays] = useState<Date[]>([])
    const [requiredDiet , setRequiredDiet] = useState<diet[]>()
    const [groupedMeals , setGroupedMeals] = useState<Map<Date , number>>()
   
  const toggleDrawer = () => {
    setIsDrawer(!isDrawer);
    setIsBlurred(!isBlurred); // Toggle blur effect when drawer is opened/closed
  }

  //so im thinking of returning the user along with the response on the function below and then seeing the calories taken 
  // in on those dates or maybe i can just return the user from the back poupulated with the diet, sort it and then
  //do the calories in .   so the function that sorts ive been working on it in the mealshisory page
  // i can make it a global function and then use it in both places

  useEffect( ()=> {
    setWeekDays(getDaysOfTheWeek())

    async function doAtStart(){
        const res = await getworkout()
        console.log(res)
        const sortedResponse = res?.workout.sort((a : any, b : any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        console.log(` this is your sortedRespnse : ${sortedResponse}`);
        // if(!sortedResponse) return;
        const diet = res?.diet
        setRequiredDiet(diet)
        console.log(diet);       
        setResponse(sortedResponse)                  
     }
     doAtStart()
    
  } , [])

  useEffect(()=>{    
    const groupMealsByDate = () => {
        console.log('first thing first' , requiredDiet)
        const groupedMeals = new Map();
        requiredDiet?.forEach((item : any) => {
            item.meals.forEach((meal : any) => {
                const date = meal.time.toDateString();
                if (!groupedMeals.has(date)) {
                    groupedMeals.set(date, []);
                }
                groupedMeals.get(date).push(meal);              
                //  console.log('this is your grouped meals ', groupedMeals) ;
            });
        });

        const sumOfCaloriesForDay =() =>{ 
            const newSummedCalories = new Map()
            groupedMeals.forEach((value, key) => { 
            let sum : number = 0;
            value.forEach((item : any) => sum += item.calories)
            console.log(sum);
            newSummedCalories.set(key , sum)     
        })
        return newSummedCalories
        }
        console.log("here you go" , sumOfCaloriesForDay());
        setGroupedMeals(sumOfCaloriesForDay())
    };
    groupMealsByDate()
    groupCaloriesForExerciseByDate()
  } ,[requiredDiet])

  const groupCaloriesForExerciseByDate = () =>{
    const mapCaloriesToDay = new Map()
    response?.forEach((resItem : any) => {
        const date = resItem.createdAt.toDateString()
        if(!mapCaloriesToDay.has(date)){
            mapCaloriesToDay.set(date , [])
        }
        mapCaloriesToDay.get(date).push(resItem.caloriesBurnt)
    })

    const summedBurntCalories = new Map()
    mapCaloriesToDay.forEach((value , key) =>{
        const sum : number = value.reduce((acc : number, curr : number) => acc + curr, 0)
        summedBurntCalories.set(key, sum)
    })
    console.log("calculated calories" , summedBurntCalories);
    console.log("calculated calories" , mapCaloriesToDay);
    return summedBurntCalories
  }

  return (
    <div className={ isBlurred ? 'blur-xl flex justify-around items-center pt-20 p-5' 
    : 'flex justify-around items-center  pt-28 p-5 '}>
        <div className=' flex justify-center bg-opacity-10'>
            <div className=' h-96 w-96  rounded-xl grid grid-cols-2 gap-4 '>
            { response?.length === 0 ? <h1>loading...</h1> : response?.slice(0,8).map(( day , index) => (
                
                <Dialog>
                <DialogTrigger >
                <div className="p-1">
                <Card className=' hover:scale-110 hover:shadow-2xl shadow-xl bg-[#190482] text-white dark:shadow-md dark:shadow-white'>
                    <CardContent className="flex items-center justify-center p-6 flex-col ">
                    <span className="text-3xl font-semibold ">{format(day.createdAt, 'EEEE')}</span>
                    <span className=' font-bold'><p>{format(day.createdAt, 'dd/MM')}</p></span> 
                    </CardContent>
                </Card>
                </div>
                </DialogTrigger>
                <DialogContent className = 'bg-slate-500/0 dark:bg-background rounded-3xl shadow-xl border-none'>
                    <DialogHeader>
                    <DialogTitle className = " text-center">{`${format(day.createdAt , 'EEEE')} ${format(day.createdAt , 'dd/MM/yyy  HH:mm')}`}</DialogTitle>
                    <DialogDescription>
                    <Card className=' m-4 shadow-xl bg-[#31304D] text-white dark:shadow-md dark:shadow-white'>
                        <CardContent className="flex items-center justify-center p-6 m-4">
                        <span className="text-3xl font-semibold ">
                           {day.running? 
                           <h1 className=' pb-3'>{`Ran ${day.runningDistance} KM in ${day.runningDuration} Mins`}</h1>
                           : null}
                           <h1 className=' pb-1 underline'>Exercises : </h1>
                           <ol>
                            {
                                day.workout.map((item : string) => <li>{item}</li>)
                            }
                           </ol>
                           <h1 className=' pt-3'>{`Calories Burnt : ${day.caloriesBurnt}`}</h1>
                        </span>
                        </CardContent>
                    </Card>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
                </Dialog>
            ))}
              </div>
        </div>
        
        <div className='flex flex-col gap-6 justify-center items-center'>
        <Button className=' bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white px-4 py-2 rounded-xl hover:scale-105 shadow-xl'>
            <h1>See all of your trainings</h1>
                {/* <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-xl bg-[#190482] text-white"
                /> */}
        </Button>
        <div>
        <Drawer onClose={() => setIsBlurred(false)}> {/* Update state when drawer is closed */}
            <DrawerTrigger>
                <Button
                className=' bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white px-4 py-2 rounded-xl hover:scale-105 shadow-xl'
                onClick={toggleDrawer}>
                    See Training days burnt Calories
                </Button>
            </DrawerTrigger>
            <DrawerContent className=' bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white opacity-85'>
                <DrawerHeader>
                <DrawerTitle>Burnt calories in your training sessions</DrawerTitle>
                <DrawerDescription>Keep up the hard work</DrawerDescription>
                </DrawerHeader>
                     <div className=' flex justify-center items-center'>
                <RenderBarChart
                 response = {groupCaloriesForExerciseByDate()}
                 groupedmeals = {groupedMeals as Map<Date , number>}/>
                </div>
                <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                    <Button variant="outline" className=' rounded-xl'>Close</Button>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
        </div>
    
  </div>
</div>
  )
}

export default WorkOutHistory
