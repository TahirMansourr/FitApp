import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  
  import React from 'react'
import ChallengeCard from "./ChallengeCard"
  
  const CardComponent = () => {
    return (
      <div className=" pl-44">
        <Carousel className="w-full max-w-xs items-center ">
          <CarouselContent>
            {/* {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  q
                </div>
              </CarouselItem>
            ))} */}
            <CarouselItem  className=" rounded-md" > <ChallengeCard></ChallengeCard></CarouselItem>
            <CarouselItem> is</CarouselItem>
            <CarouselItem> for</CarouselItem>
            <CarouselItem> displaying</CarouselItem>
            <CarouselItem> challenges</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    )
  }
  
  export default CardComponent