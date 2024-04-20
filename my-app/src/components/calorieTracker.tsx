'use client'
import React , {useState , useEffect} from 'react'
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
    const [todaysCals , setTodaysCals] = useState()

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
                // Add the value of the field you want to sum to the total
                return total + item.caloriesBurnt;
            }, 0);
            console.log('Total sum:', totalSum);
            console.log('this is your whatever', something);                
         }
         doAtStart()       

        //  const something = response?.find((item) => new Date(item.createdAt).toDateString() === new Date().toDateString())
        //  console.log('this is your whatever' , something)
    } , [])

  return (
    <div>
     <Dialog>
        <DialogTrigger className='flex'>     
            <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{
                duration: 1,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}
            className='flex items-center'
            >
                    <HiOutlineArrowSmUp size={50} color='red' />
                    <BsFire size={30} color='red' />
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