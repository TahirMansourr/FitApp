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
                    // Add the calories of the current meal to the total
                    total += meal.calories;
                });
                return total;
            }, 0)
            setInCals(totalinCal)

            console.log('this is your diet something' , dietsomething);
            console.log('Total sum:', dietsomethingToObject);
            console.log('this is your whatever', something);
            console.log('this is your totalinCal' , totalinCal)                
         }
         doAtStart()       

        //  const something = response?.find((item) => new Date(item.createdAt).toDateString() === new Date().toDateString())
        //  console.log('this is your whatever' , something)
    } , [])

  return (
    <div>
     <Dialog>
        <DialogTrigger className='flex w-full'>     
            <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{
                duration: 1,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}
                className='flex flex-col items-center border shadow-lg rounded-xl w-full'
            >
                <div className='flex items-center'>
                <HiOutlineArrowSmUp size={50} color='red' />
                <CountUp start={0} end={inCals} duration={2.5} delay={1} />
                </div>
                <div className='flex items-center'>
                <BsFire size={30} color='red' />
                <CountUp start={0} end={burntCals} duration={2.5} delay={1} />
                </div>
                    
                    
            </motion.div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
     </Dialog>

    </div>
  )
}

export default CalorieTracker