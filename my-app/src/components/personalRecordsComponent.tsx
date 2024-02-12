
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { PersonalRecordsArray } from "@/DTO"

const PersonalRecordsComponent = () => {
  return (
    <div className=" w-full">
        <h1>My Personal records</h1>
         <Carousel
      opts={{
        align: "start",
      }}
      orientation="vertical"
      className="w-full max-w-xs shadow-xl hover:scale-110"
    >
      <CarouselContent className="-mt-1 h-28 rounded-lg shadow-lg ">
        {PersonalRecordsArray.map(( obj , index) => (
          
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="p-1">
              <Card className=" shadow-xl bg-[#304D30] text-[#FFBB5C] dark:shadow-md dark:shadow-white">
                <CardContent className="flex items-center justify-center p-6 flex-col">
                  <span className=" font-semibold"><h3>{Object.keys(obj)}</h3></span>
                  <span className="text-xl font-bold"><h1>{Object.values(obj)}</h1></span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
    </Carousel>
    </div>
  )
}

export default PersonalRecordsComponent