'use client'
import React, { useState } from 'react'
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
   import { MdDone } from "react-icons/md";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import BFC from '@/components/profileChallengeComponent';
import { participateToChallenge } from '@/lib/actions/ChallengeActions/participateToChallenge';
import { LikeChallenge } from '@/lib/actions/ChallengeActions/likeChallenge';
import heart from '../../../public/assets/heart.svg'
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { PiShareFatLight } from "react-icons/pi";
import { GrUserAdd } from "react-icons/gr";
import Link from 'next/link';
import LoadingComponent from '../LoadingComponent';


const ChallengeCard = ({obj} : {obj : any}) => {
    console.log('this is your obj' + obj.participants)

    const [response , setResponse] = useState<"success" | {error: any}>()
    const [loading , setLoading] = useState<boolean>(false)

    async function handleClick(param : string){
        setLoading(true)
        await participateToChallenge(param).then(res => setResponse(res))
        setLoading(false)
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
                                   {   !response ?  
                                    <TooltipProvider>
                                        <Tooltip>
                                        <TooltipTrigger>
                                           { !loading?
                                            <GrUserAdd 
                                             onClick={() => handleClick(obj._id)}
                                             size={25}/>
                                           : <LoadingComponent LoadingText='participating...'/> }
                                        </TooltipTrigger>
                                        <TooltipContent  className=' rounded-xl border-none shadow-lg bg-slate-300 text-black'>
                                            <p>Participate to this challenge</p>
                                        </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                     : response === "success" ? <MdDone color='green' size={30}/> 
                                     : <div>refresh and try again</div> }
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