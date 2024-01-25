'use client'
import RenderBarChart from '@/components/barChart'
import { Card, CardContent } from "@/components/ui/card"
import { useState } from 'react'
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
//import './WorkOutHistory.css'; // Import the CSS file for styling

const WorkOutHistory = () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [isDrawer , setIsDrawer] = useState(false)
    const [isBlurred, setIsBlurred] = useState(false); // State to manage blur effect

  const toggleDrawer = () => {
    setIsDrawer(!isDrawer);
    setIsBlurred(!isBlurred); // Toggle blur effect when drawer is opened/closed
  }

  return (
    <div className={ isBlurred ? 'blur-xl flex justify-around items-center mt-6 p-5' 
    : 'flex justify-around items-center mt-6 p-5 '}>
        <div className=' flex justify-center bg-opacity-10'>
            <div className=' h-96 w-96  rounded-xl grid grid-cols-2 gap-4 '>
            {Array.from({ length: 7 }).map((_, index) => (
                            
                            <Dialog className = ' ' >
                            <DialogTrigger>
                            <div className="p-1">
                            <Card>
                                <CardContent className="flex items-center justify-center p-6  ">
                                <span className="text-3xl font-semibold "> Day{index + 1}</span>
                                </CardContent>
                            </Card>
                            </div>
                            </DialogTrigger>
                            <DialogContent className = 'bg-slate-500/100 '>
                                <DialogHeader>
                                <DialogTitle>Are you absolutely sure?</DialogTitle>
                                <DialogDescription>
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
                    className="rounded-xl bg-gray bg-opacity-10 "
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
{/* <Carousel
                    opts={{
                        align: "start",
                    }}
                    orientation="vertical"
                    className="w-full max-w-xs overflow-hidden h-full "
                    >
                <CarouselContent className="-mt-1 h-[200px]">
                        {Array.from({ length: 30 }).map((_, index) => (
                        <CarouselItem key={index} className="pt-1 md:basis-1/2 -mt-0">
                            
                            <Dialog>
                            <DialogTrigger>
                            <div className="p-1">
                            <Card>
                                <CardContent className="flex items-center justify-center p-6 w-72 ">
                                <span className="text-3xl font-semibold "> Day{index + 1}</span>
                                </CardContent>
                            </Card>
                            </div>
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
                            
                            
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* <CarouselPrevious />
                    <CarouselNext /> 
                    </Carousel>
            */}