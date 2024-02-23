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
import CardInputComponent from "./forms/ChallengeCard"
// import { challegnArray, generateChallengesArray } from "./arrayofchallenges"
import CreateChallengeForm from "./forms/createChallengeForm";
import { currentUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getAllChallenges } from "@/lib/actions/ChallengeActions/findAllChallenges";
import { ChallengeItem } from "./arrayofchallenges";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight :"400",
  subsets : ["latin"]
})
  
  async function ChallengesComponent() {

    //const challengeLists = await generateChallengesArray()
     const [challengeLists , setChallengeList] = useState<any>([])


    return (
      <div className={roboto.className}>
        <h1>New Challenges</h1>
        <ChallengeItem/>
      </div>
    )
  }
  
  export default ChallengesComponent


  // <Dialog  >
  //                           <DialogTrigger >
  //                           {/* <div className="p-1">
  //                           <TooltipProvider>
  //                               <Tooltip>
  //                                 <TooltipTrigger>
  //                                     <SiAddthis size={20} />
  //                                 </TooltipTrigger>
  //                                 <TooltipContent>
  //                                   <p>Create a new challenge</p>
  //                                 </TooltipContent>
  //                               </Tooltip>
  //                             </TooltipProvider>
  //                           </div> */}
  //                           </DialogTrigger>
  //                           <DialogContent className = 'rounded-2xl border border-emerald-50 bg-[#242c56] text-white shadow-xl '>
  //                               <DialogHeader>
  //                               <DialogTitle>Create Challenge</DialogTitle>
  //                               <div className=" pt-5 pb-3">
  //                                 <CreateChallengeForm />
  //                               </div>
  //                               <DialogDescription>
  //                                  After you submit this challenge it will be shared with other users
  //                               </DialogDescription>
  //                               </DialogHeader>
  //                           </DialogContent>
  //       </Dialog>
      