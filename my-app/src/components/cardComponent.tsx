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
  
  import { SiAddthis } from "react-icons/si";
  
  import React from 'react'
import CardInputComponent from "./ChallengeCard"
import { challegnArray } from "./arrayofchallenges"
  
  const ChallengesComponent = () => {
    return (
      <div className="">
        <h1>Explore Challenges</h1>
        <Carousel className="w-full max-w-xs items-center rounded-lg dark:shadow-amber-50 dark:shadow-lg">
          <CarouselContent>
          {challegnArray.map( (obj , index) => (
            <CarouselItem 
            key={index}
            className=" p-4 flex justify-center dark:shadow-lg dark:shadow-amber-50"
            >
             {obj}
            </CarouselItem>
          ))}
           
          </CarouselContent>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
                <SiAddthis size={20}/>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create a new challenge</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        
      </div>
    )
  }
  
  export default ChallengesComponent


   {/* {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  q
                </div>
              </CarouselItem>
            ))} */}
            {/* <CarouselItem  className=" rounded-md" > </CarouselItem>
            <CarouselItem> is</CarouselItem>
            <CarouselItem> for</CarouselItem>
            <CarouselItem> displaying</CarouselItem>
            <CarouselItem> challenges</CarouselItem> */}