
import { GetMyChallenges } from '@/lib/actions/ChallengeActions/getmychallenges'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react'
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
import Image from 'next/image';
import heart from '../../../public/assets/heart.svg'
import { PiShareFatLight } from "react-icons/pi";
import Link from 'next/link';
import ChallengeProgressComponent from '@/components/challengesComponents/challengeProgressComponent';
import { currentUser } from '@clerk/nextjs';
import { fetchUser } from '@/lib/actions/userActions/fetchUser';
import { ScrollArea } from "@/components/ui/scroll-area"



const MyChallenges = async () => {

    const user = await currentUser()
    if(!user) return null
    const mongoUser = await fetchUser({userId : user.id})

    const challenges = await GetMyChallenges()
    //  console.log(`these are the challenges ${challenges}`);

    const createdChallenges = await GetMyCreatedChallenges()
    // console.log(`createdChallenges : ${createdChallenges}`);
    

    
  return (
    <div className='flex flex-col p-10 pt-24 gap-7'>
         <div>
        <Tabs defaultValue="myChallenges">
            <div className="mx-auto w-fit">
            <TabsList className=' mx-auto'>
                <TabsTrigger value="myChallenges"> myChallenges </TabsTrigger>
                <TabsTrigger value="CompletedChallenges">Completed Challenges</TabsTrigger>
                <TabsTrigger value="random">created Challenges</TabsTrigger>
            </TabsList>
            </div>
            
            <TabsContent value="myChallenges" className=' w-full'>
            <div className=' mx-auto'>
                <div className=' grid grid-cols-3 gap-3 ml-2'>
                    {
                        challenges && challenges.map((obj : any , index : number) => (
                            <Dialog>
                            <DialogTrigger className=" ">
                            <Card key={index} className="shadow-xl bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white dark:shadow-md dark:shadow-white w-full h-fit max-w-[15rem]">
                                <CardHeader className=" text-center p-2">
                                    <CardTitle >{obj.theChallenge.name}</CardTitle>
                                    <CardDescription> {obj.theChallenge.description}  </CardDescription>
                                </CardHeader>
                                <CardContent className=" mt-3 ">
                                    <p>{obj.theChallenge.body.slice(0,50)} {obj.theChallenge.body.length > 50 ?' ...' : null}</p>
                                </CardContent>
                                <CardFooter className=" p-1 mb-2 mx-auto">
                                    <div>
                                    Created by:  {obj.theChallenge.createdBy.username}
                                   
                                    </div>
                                   
                                </CardFooter>
                            </Card>
                            </DialogTrigger>
                            
                            <DialogContent className = 'rounded-2xl  bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white shadow-xl max-h-[90%]  '>
                               <ScrollArea className=' '>
                               <DialogHeader>
                                <DialogTitle className=' mx-auto text-center rounded-xl shadow-xl w-fit p-3 mb-0'>
                                    {obj.theChallenge.name}
                                    </DialogTitle>
                                    <div className=' flex justify-between'>
                                        <div>{obj.theChallenge.description}</div>
                                        <div>Start Date: {format(obj.participatedAt , 'dd/MM/yyy  HH:mm')}</div>
                                    
                                    </div>
                                    <div className=" mt-6 mb-3 p-3 border bg-slate-800 rounded-xl whitespace-pre-line">
                                        {obj.theChallenge.body}
                                    </div>
                                    <DialogDescription className="flex justify-between items-center">
                                     <div className=' flex flex-col w-full'>
                                    
                                     <Link href={`/Profile/${obj.theChallenge.createdBy._id}`}>
                                        <div className=' flex flex-col mb-3'>
                                            <div>
                                            {` created by : ${obj.theChallenge.createdBy.username}`}
                                            </div>
                                            <div>
                                            {` Participants : ${obj.theChallenge.participants.length}`}
                                            </div>
                                         
                                        </div>
                                    
                                    </Link>
                                     <div className=' flex justify-between items-center w-full'>
                                     <div className=' flex'>
                                    {/* <BFC challengeId = {obj._id as ObjectId}/> */}
                                    <ChallengeProgressComponent 
                                    challengeId = {obj.theChallenge._id}
                                    userId = {mongoUser._id}
                                  
                                    />
                                    </div>
                                        <div className=' flex gap-3'>
                                        <Image
                                            src = {heart}
                                            alt = 'like image'
                                            width = {24}
                                            height = {24}
                                        />
                                        <PiShareFatLight size={25} />
                                        </div>
                                   
                                    
                                     </div>
                                     </div>
                                   
                                   
                                    </DialogDescription>
                                </DialogHeader>
                               </ScrollArea>
                                
                            </DialogContent>
                        
                        </Dialog>
                        ))
                    }
                </div>
            </div>
            </TabsContent>

            <TabsContent value="CompletedChallenges">
                
            </TabsContent>
            <TabsContent value="random">
                <div>
                {
            createdChallenges && createdChallenges.map((obj : any , index : number) => (
                <Dialog>
                <DialogTrigger className=" ">
                <Card key={index} className="shadow-xl bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white dark:shadow-md dark:shadow-white w-full h-fit max-w-[15rem]">
                    <CardHeader className=" text-center p-2">
                        <CardTitle >{obj.name}</CardTitle>
                        <CardDescription> {obj.description} </CardDescription>
                    </CardHeader>
                    <CardContent className=" mt-3 ">
                        <p>{obj.body.slice(0,50)} {obj.body.length > 50 ?' ...' : null}</p>
                    </CardContent>
                    <CardFooter className=" p-1 mb-2 mx-auto">
                        Created AT :  {format(obj.createdAt , 'dd/MM/yyy  HH:mm')}
                    </CardFooter>
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
                        <DeletehthisChallenge id = {obj._id}/>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
               
            </Dialog>
            ))
              }
                </div>
          
            </TabsContent>
        </Tabs>
    </div>
 
    
    {/* <div  className='w-[15rem] px-5 py-2 text-center shadow-2xl rounded-xl bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white'>
        <h1>Browse all challenges</h1>
    </div> */}
    </div>
  
  )
}

export default MyChallenges