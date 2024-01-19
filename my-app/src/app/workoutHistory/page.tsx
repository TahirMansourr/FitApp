'use client'
import RenderBarChart from '@/components/barChart'

import { Card, CardContent } from "@/components/ui/card"
import { useState } from 'react'
import { Calendar } from "@/components/ui/calendar"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  

const WorkOutHistory = () => {
    const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className=' flex flex-col justify-center items-center align-middle p-5 '>
        <div className=' flex justify-between bg-opacity-10'>
        <div>
            {/* <h1>Work Out History Page</h1> */}
            <div className=' h-96 w-96  rounded-xl'>
            <Carousel
                    opts={{
                        align: "start",
                    }}
                    orientation="vertical"
                    className="w-full max-w-xs h-96"
                    >
                    <CarouselContent className="-mt-1 h-[300px]">
                        {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="pt-1 md:basis-1/2">
                            
                            <Dialog>
                            <DialogTrigger>
                            <div className="p-1">
                            <Card>
                                <CardContent className="flex items-center justify-center p-6 ">
                                <span className="text-3xl font-semibold"> Tahit{index + 1}</span>
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
                    <CarouselNext /> */}
                    </Carousel>
            </div>
        </div>
        <div className=''>
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-xl bg-gray bg-opacity-10 "
        />
        </div>
        </div>
        
        <div>
            <RenderBarChart/>
        </div>
    </div>
  )
}

export default WorkOutHistory