import React from 'react'
import { GetMyChallenges } from '@/lib/actions/ChallengeActions/getmychallenges'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {format} from 'date-fns'
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
import { completeChallenge } from '@/lib/actions/ChallengeActions/completeChallenge';
import BFC from '@/components/profileChallengeComponent';
import { ObjectId } from 'mongoose';
import { GetMyCreatedChallenges } from '@/lib/actions/ChallengeActions/getMyCreatedChallenges';
import DeletehthisChallenge from '@/components/challengesComponents/deletebutton';

const ChallengeCard = ({obj} : {obj : any}) => {
    console.log('this is your createdBy' +obj.createdBy)
  return (
    <div>
         <Dialog>
                            <DialogTrigger className=" ">
                            <Card className="shadow-xl bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white dark:shadow-md dark:shadow-white w-full h-fit max-w-[15rem]">
                                <CardHeader className=" text-center p-2">
                                    <CardTitle >{obj.name}</CardTitle>
                                    <CardDescription> {obj.description} </CardDescription>
                                </CardHeader>
                                <CardContent className=" mt-3 ">
                                    <p>{obj.body.slice(0,50)} {obj.body.length > 50 ?' ...' : null}</p>
                                </CardContent>
                                {/* <CardFooter className=" p-1 mb-2 mx-auto">
                                    Created by :  {obj.createdBy.username}
                                </CardFooter> */}
                            </Card>
                            </DialogTrigger>
                            <DialogContent className = 'rounded-2xl  bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white shadow-xl '>
                                <DialogHeader>
                                    <DialogTitle className=' text-center'>
                                    {obj.name}
                                    </DialogTitle>
                                    <div className=" pt-5 pb-3">
                                        {obj.body}
                                    </div>
                                    <DialogDescription className="flex justify-between items-center">
                                    <div>
                                    {obj.description}
                                    </div> 
                                    {/* <BFC challengeId = {obj._id as ObjectId}/> */}
                                    {` created by : ${obj.createdBy.username}`}
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        
                            </Dialog>
    </div>
  )
}

export default ChallengeCard