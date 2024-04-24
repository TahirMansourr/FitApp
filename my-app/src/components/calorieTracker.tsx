'use client'
import React , {useState , useEffect} from 'react'
import CountUp from 'react-countup';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { HiOutlineArrowSmUp } from "react-icons/hi";
  import { HiOutlineArrowSmDown } from "react-icons/hi";
  import { BsFire } from "react-icons/bs";
  import { motion } from "framer-motion";
  import { getworkout } from '@/lib/actions/workOutActions/getworkouts';
  import { getDaysOfTheWeek } from '@/app/workoutHistory/dateComponent';
  import { Progress } from "@/components/ui/progress"
  import { setGoals } from '@/lib/actions/GoalActions';
  import Goalform from './forms/setGoalsForm';


  interface diet{
    id : string,
    meals : {
        meal : string,
        time : Date,
        calories : number
    }[]
}

const CalorieTracker = () => {

    const [requiredDiet , setRequiredDiet] = useState<diet[]>()
    const [response , setResponse] = useState<any[]>()
    const [weekDays , setWeekDays] = useState<Date[]>([])
    const [burntCals , setBurntCals] = useState()
    const [inCals , setInCals] = useState()
    const [progress, setProgress] = React.useState(0)
    const [localGoals , setLocalGoals] = useState<{caloriesIn : number , caloriesBurnt : number}>({caloriesIn : 0 , caloriesBurnt : 0})

    useEffect( ()=> {
        setWeekDays(getDaysOfTheWeek())    
       
            async function doAtStart(){
                const res = await getworkout()
                // console.log(res)
                const sortedResponse = res?.workout.sort((a : any, b : any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                // console.log(` this is your sortedRespnse : ${sortedResponse}`);
                const diet = res?.diet
                setRequiredDiet(diet)
                // console.log(diet);       
                setResponse(sortedResponse) 
            
            const something = sortedResponse?.filter((item : any) => new Date(item.createdAt).toDateString() === new Date().toDateString());
            
            const totalSum = something.reduce((total: number, item: any) => {
                return total + item.caloriesBurnt;
            }, 0);
            
            setBurntCals(totalSum)
            
            const dietsomething = diet.map((item : any)=>item.meals.filter((item : any) => new Date(item.time).toDateString() === new Date().toDateString())).filter((arr : any) => arr.length >0)
            
            const dietsomethingToObject = dietsomething.map((item : any) => (
                item.reduce((acc:any , currVal:any , index : number) => {
                acc[index] = currVal
                return acc
            },{})))
            
            const totalinCal = dietsomethingToObject.reduce((total : number , item : any) => {
                Object.values(item).forEach((meal: any) => {
                    total += meal.calories;
                });
                return total;
            }, 0)
            setInCals(totalinCal)
            
            const myGoalsForToday = res?.goals
            setLocalGoals(myGoalsForToday)
            console.log('here is  your goals' , myGoalsForToday);
            
            // this is for setting the goals to {0,0 } at the beggining of the day
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(now.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            const timeUntilMidnight = tomorrow.getTime() - now.getTime();
            setTimeout(() => {
                setGoals({ caloriesIn: 0, caloriesBurnt: 0 });
            }, timeUntilMidnight);
            
            // const timer = setTimeout(() => setProgress(66), 500)
            // console.log('this is your diet something' , dietsomething);
            // console.log('Total sum:', dietsomethingToObject);
            // console.log('this is your whatever', something);
            // console.log('this is your totalinCal' , totalinCal)                
         }
         doAtStart()       
    } , [])

  return (
    <div>   
            <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{
                duration: 1,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}
                className='flex flex-col border justify-center items-center shadow-lg rounded-xl w-[12rem] py-2  border-blue-500 m-4 text-sm'
            >
                 <Dialog>
                    <DialogTrigger className=' hover:scale-10 rounded-xl pb-2'>
                    <div className=' text-sm flex flex-col justify-center items-center'>
                    <div className=' '>{`Today's Goal`}</div>
                    <div className='flex justify-center items-center text-xs gap-1'>
                    <div className=' flex items-center'>
                         <HiOutlineArrowSmUp size={15} color='red' />
                         <p className=''>{localGoals ? localGoals.caloriesIn : '0'}</p>
                     </div>
                    <div className=' flex items-center  mx-auto'>
                        <BsFire size={10} color='red' />
                        <div className=''>{localGoals? localGoals.caloriesBurnt : '0'}</div>
                    </div>
                    
                    </div>
                </div>
                    </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone.
                            </DialogDescription>
                            </DialogHeader>
                            <Goalform/>
                        </DialogContent>
                 </Dialog>
                
                <div className=' left-1'>Current Process</div>
                <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center text-xs'>
                <HiOutlineArrowSmUp size={18} color='red' />
                <div className='flex gap-1'>
                    <CountUp start={0} end={inCals} duration={2.5} delay={1} /> 
                    <div>KCal</div>
                </div>
                </div>
                <div className='flex items-center gap-1 pl-1'>
                    <BsFire size={10} color='red' />
                    <div className='flex gap-1 text-xs'> 
                    <CountUp start={0} end={burntCals} duration={2.5} delay={1} />
                    <div> KCal</div>
                </div>
               
                </div>
                </div>
                                  
            </motion.div>
           

    </div>
  )
}

export default CalorieTracker