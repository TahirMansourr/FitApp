'use client'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  import { 
    Dialog,
     DialogContent,
      DialogDescription,
       DialogHeader,
        DialogTitle,
         DialogTrigger 
        } from "@/components/ui/dialog"

  
  import { SiAddthis } from "react-icons/si";
  
  import React from 'react'
import CardInputComponent from "./ChallengeCard"
import { challegnArray } from "./arrayofchallenges"
  
  const ChallengesComponent = () => {



    return (
      <div className="">
        <h1>My Challenges</h1>
        <Carousel className="w-full max-w-xs items-center rounded-lg  dark:shadow-lg">
          <CarouselContent>
          {challegnArray.map( (obj , index) => (
            <CarouselItem 
            key={index}
            className=" p-4 flex justify-center dark:shadow-lg"
            >
             {obj}
            </CarouselItem>
          ))}
           
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
        <Dialog className = ' ' >
                            <DialogTrigger>
                            <div className="p-1">
                            <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                      <SiAddthis size={20} />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Create a new challenge</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
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
      

        
      </div>
    )
  }
  
  export default ChallengesComponent


