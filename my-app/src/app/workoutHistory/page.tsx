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
import { SiH3 } from 'react-icons/si'

const WorkOutHistory = () => {

    const [date, setDate] = useState<Date | undefined>(new Date())
    const [isDrawer , setIsDrawer] = useState(false)
    const [isBlurred, setIsBlurred] = useState(false); // State to manage blur effect
    const [weekDays , setWeekDays] = useState<Date[]>([])

  const toggleDrawer = () => {
    setIsDrawer(!isDrawer);
    setIsBlurred(!isBlurred); // Toggle blur effect when drawer is opened/closed
  }

  useEffect( ()=> {
    setWeekDays(getDaysOfTheWeek())
  } , [])

  return (
    <div className={ isBlurred ? 'blur-xl flex justify-around items-center mt-6 p-5' 
    : 'flex justify-around items-center mt-6 p-5 '}>
        <div className=' flex justify-center bg-opacity-10'>
            <div className=' h-96 w-96  rounded-xl grid grid-cols-2 gap-4 '>
            {weekDays.map(( day , index) => (
                
                <Dialog>
                <DialogTrigger >
                <div className="p-1">
                <Card className=' hover:scale-110 hover:shadow-2xl shadow-xl bg-[#190482] text-white dark:shadow-md dark:shadow-white'>
                    <CardContent className="flex items-center justify-center p-6 flex-col ">
                    <span className="text-3xl font-semibold ">{format(day, 'EEEE')}</span>
                    <span className=' font-bold'><p>{format(day, 'dd/MM')}</p></span> 
                    </CardContent>
                </Card>
                </div>
                </DialogTrigger>
                <DialogContent className = 'bg-slate-500/0 dark:bg-background rounded-3xl shadow-xl border-none'>
                    <DialogHeader>
                    <DialogTitle className = " text-center">{`${format(day , 'EEEE')} ${format(day , 'dd/MM/yyy')}`}</DialogTitle>
                    <DialogDescription>
                    <Card className=' m-4 shadow-xl bg-[#31304D] text-white dark:shadow-md dark:shadow-white'>
                        <CardContent className="flex items-center justify-center p-6 m-4">
                        <span className="text-3xl font-semibold ">{TrainingHistory.filter( obj => areDatesEqual(obj.date , day)).map(
                            obj => <div>
                            {obj.run ? <h1>{`Ran ${obj.runningDistance} KM in ${obj.runningDuration} MINS`}</h1>: null} 
                            {obj.todayWorkout.map( obj => <h3>{obj}</h3>)}
                            
                            </div>
                        )}</span>
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
        
        <div className='flex flex-col gap-6'>
        <div className=''>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-xl bg-[#190482] text-white"
                />
        <div>
        <Drawer onClose={() => setIsBlurred(false)}> {/* Update state when drawer is closed */}
            <DrawerTrigger>
                <Button onClick={toggleDrawer}>
                    See Training days and burnt Calories
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>This action cannot be undone.</DrawerDescription>
                </DrawerHeader>
                     <div className=' flex justify-center items-center'>
                <RenderBarChart/>
                </div>
                <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
        </div>
    </div>
  </div>
</div>
  )
}

export default WorkOutHistory
