'use client'
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllChallenges } from "@/lib/actions/ChallengeActions/findAllChallenges";

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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger 
   } from "@/components/ui/dialog"
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { participateToChallenge } from "@/lib/actions/ChallengeActions/participateToChallenge";


export function ChallengeItem() {
    const [challengeFromDb, setChallengeFromDb] = useState<any[]>([]);

    useEffect(() => {
        async function fetchChallenges() {
            try {
                const fetching = await getAllChallenges();
                setChallengeFromDb(fetching);
                console.log("Challenges fetched:", fetching);
            } catch (error) {
                console.error("Error fetching challenges:", error);
            }
        }

        fetchChallenges();

        // Cleanup function for when the component unmounts
    }, []); // Empty dependency array to run useEffect only once after initial render

    async function handleClick(param : string){
        await participateToChallenge(param)
    }

    return (
        <>
        <Carousel className="w-full max-w-xs items-center rounded-lg  dark:shadow-lg mb-0 p-0">
            <CarouselContent>
            {challengeFromDb.length > 0 ? (
                challengeFromDb.map((obj: any, index: number) => (
                    <CarouselItem
                    key={index}
                    // className=" flex justify-center dark:shadow-lg w-full"
                    >
                        <Dialog>
                            <DialogTrigger className=" w-full">
                            <Card key={index} className="shadow-xl bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white dark:shadow-md dark:shadow-white w-full h-fit">
                                <CardHeader className=" text-center p-2">
                                    <CardTitle >{obj.name}</CardTitle>
                                    <CardDescription> {obj.description} </CardDescription>
                                </CardHeader>
                                <CardContent className=" mt-3 ">
                                    <p>{obj.body.slice(0,50)} {obj.body.length > 50 ?' ...' : null}</p>
                                </CardContent>
                                <CardFooter className=" p-1 mb-2 mx-auto">
                                    Created by :  {obj.createdBy.username}
                                </CardFooter>
                            </Card>
                            </DialogTrigger>
                            <DialogContent className = 'rounded-2xl border border-emerald-50 bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white shadow-xl '>
                                <DialogHeader>
                                    <DialogTitle>
                                       {obj.name}
                                    </DialogTitle>
                                    <div className=" pt-5 pb-3">
                                        {obj.body}
                                    </div>
                                    <DialogDescription className="flex justify-between">
                                     <div>
                                     {obj.description}
                                    </div> 
                                    <TooltipProvider>
                                        <Tooltip>
                                        <TooltipTrigger>
                                            <p onClick={() => handleClick(obj._id)}>+</p>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Participate to this challenge</p>
                                        </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                      {` created by : ${obj.createdBy.username}`}
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                           
                        </Dialog>
                     
                    </CarouselItem >
                    
                ))
            ) : (
                <CarouselItem>
                     <Card className="shadow-xl bg-[#31304D] text-white dark:shadow-md dark:shadow-white">
                    <CardHeader>
                        <CardTitle>Placeholder</CardTitle>
                        <CardDescription>Description will be here</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Placeholder</p>
                    </CardContent>
                </Card>
                </CarouselItem>
               
            )}
            </CarouselContent>
        </Carousel>
            
        </>
    );
}
