'use client'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger 
   } from "@/components/ui/dialog"
   import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  import { TooltipProvider } from "@radix-ui/react-tooltip";

import { completeChallenge } from '@/lib/actions/ChallengeActions/completeChallenge';
import BFC from '@/components/profileChallengeComponent';
import { ObjectId } from 'mongoose';
import { GetMyCreatedChallenges } from '@/lib/actions/ChallengeActions/getMyCreatedChallenges';
import DeletehthisChallenge from '@/components/challengesComponents/deletebutton';
import { participateToChallenge } from '@/lib/actions/ChallengeActions/participateToChallenge';
import { LikeChallenge } from '@/lib/actions/ChallengeActions/likeChallenge';
import heart from '../../../public/assets/heart.svg'
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { PiShareFatLight } from "react-icons/pi";
import { GrUserAdd } from "react-icons/gr";
import Link from 'next/link';


const ChallengeCard = ({obj} : {obj : any}) => {
    console.log('this is your createdBy' +obj.createdBy)

    async function handleClick(param : string){
        await participateToChallenge(param)
    }

    async function handleLike(id : string){
       await LikeChallenge(id)
       console.log("challenge" + id + 'liked');
       
    }
  return (
    <div>
         <Dialog>
            <DialogTrigger className=" w-full">
                <Card className="shadow-xl bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white dark:shadow-md dark:shadow-white w-full h-fit">
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
            
            <DialogContent className = 'bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white shadow-xl border-none'>
               
               
               <DialogHeader>
                    <DialogTitle className=' mx-auto text-center rounded-xl shadow-xl w-fit p-3 mb-0'>
                    {obj.name}
                    </DialogTitle>
                    <div>
                    {obj.description}
                    </div> 
                    <div className=" mt-6 mb-3 p-3 border bg-slate-800 rounded-xl whitespace-pre-line">
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
                                        onClick={ () => handleLike(obj._id)}
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
                                        <TooltipContent  className=' rounded-xl border-none shadow-lg bg-slate-300 text-black'>
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
    </div>
  )
}

export default ChallengeCard