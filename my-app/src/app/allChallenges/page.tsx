'use client'
import { ChallengeItem } from '@/components/arrayofchallenges'
import { getAllChallenges } from '@/lib/actions/ChallengeActions/findAllChallenges';
import React, { useEffect, useState } from 'react'
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
import { participateToChallenge } from "@/lib/actions/ChallengeActions/participateToChallenge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import Link from 'next/link';
import Image from 'next/image';
import heart from '../../../public/assets/heart.svg'
import share from '../../../public/assets/share.svg'
import { PiShareFatLight } from "react-icons/pi";
import { GrUserAdd } from "react-icons/gr";


const AllChallenges = () => {

    const [challengeFromDb, setChallengeFromDb] = useState<any[]>([]);

    useEffect(() => {

        async function fetchChallenges() {
            try {
                const fetching = await getAllChallenges();
                setChallengeFromDb(fetching.challenges as any[]);
                console.log("Challenges fetched:", fetching);
            } catch (error) {
                console.error("Error fetching challenges:", error);
            }
        }

        fetchChallenges();

        // Cleanup function for when the component unmounts
    }, []); // Empty depen

    async function handleClick(param : string){
        await participateToChallenge(param)
    }


  return (
    <div className=' p-5 pt-28 grid grid-cols-3 gap-4 bg-white dark:bg-black dark:text-white min-h-screen'>
         {challengeFromDb.length > 0 ? (
                challengeFromDb.map((obj: any, index: number) => (
                        <Dialog key={index}>
                            <DialogTrigger className=" w-full hover:scale-105">
                            <Card key={index} className="shadow-xl bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white dark:shadow-md dark:shadow-white w-full h-fit">
                                <CardHeader className=" text-center p-2">
                                    <CardTitle >{obj.name}</CardTitle>
                                    <CardDescription> {obj.description} </CardDescription>
                                </CardHeader>
                                <CardContent className=" mt-3 ">
                                    <p>{obj.body.slice(0,40)} {obj.body.length > 40 ?' ...' : null}</p>
                                </CardContent>
                                <CardFooter className=" p-2 mb-2 text-left ">
                                    <div className=' flex flex-col'>
                                        <div>
                                        Created by :  {obj.createdBy.username}
                                        </div>
                                    <div>
                                    Participants : {obj.participants.length}
                                    </div>
                                     
                                    </div>
                                   
                                </CardFooter>
                            </Card>
                            </DialogTrigger>
                            <DialogContent className = 'rounded-2xl border border-emerald-50 bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white shadow-xl '>
                                <DialogHeader>
                                    <DialogTitle>
                                       {obj.name}

                                    </DialogTitle>
                                    <div>
                                     {obj.description}
                                    </div> 
                                    <div className=" pt-5 pb-3">
                                        {obj.body}
                                    </div>
                                    <DialogDescription className="flex flex-col">
                                    
                                    <div>
                                    <Link href={`/Profile/${obj.createdBy._id}`}>
                                    {` created by : ${obj.createdBy.username}`}
                                    </Link>
                                    </div>
                                    <div>
                                    {`participants : ${obj.participants.length}`}
                                    </div>
                                    
                                     
                                     
                                      <div className=' flex justify-between pt-4 items-center'>
                                      <div className=' flex gap-3'>
                                        <Image
                                        src={heart}
                                        alt='like'
                                        width={20}
                                        height={20}
                                        className=' hover:cursor-pointer'
                                        />
                                       <PiShareFatLight size={25} />
                                    </div>
                                    <div>
                                    <TooltipProvider>
                                        <Tooltip>
                                        <TooltipTrigger>
                                            
                                            <GrUserAdd 
                                             onClick={() => handleClick(obj._id)}
                                             size={25}/>
                                            
                                        </TooltipTrigger>
                                        <TooltipContent arrowPadding={2} className=' rounded-xl border-none shadow-lg bg-slate-300 text-black'>
                                            <p>Participate to this challenge</p>
                                        </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    </div>
                                   
                                      </div>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                           
                        </Dialog>
                     
                    
                    
                ))
            ) : (
               
                     <Card className="shadow-xl bg-[#31304D] text-white dark:shadow-md dark:shadow-white">
                    <CardHeader>
                        <CardTitle>Placeholder</CardTitle>
                        <CardDescription>Description will be here</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Placeholder</p>
                    </CardContent>
                </Card>
                
               
            )}
    </div>
  )
}

export default AllChallenges