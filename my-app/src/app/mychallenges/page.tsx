import { GetMyChallenges } from '@/lib/actions/ChallengeActions/getmychallenges'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react'
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger 
   } from "@/components/ui/dialog"

const MyChallenges = async () => {

    const challenges = await GetMyChallenges()
    console.log(challenges);
    
    
  return (
    <div className='flex justify-around items-center p-10 gap-7'>
          <div className=' mt-5 grid grid-cols-2 gap-6 ml-2'>
        {
            challenges && challenges.map((obj : any , index : number) => (
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
                        {/* <TooltipProvider>
                            <Tooltip>
                            <TooltipTrigger>
                                <p onClick={() => handleClick(obj._id)}>+</p>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Participate to this challenge</p>
                            </TooltipContent>
                            </Tooltip>
                        </TooltipProvider> */}
                          {` created by : ${obj.createdBy.username}`}
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
               
            </Dialog>
            ))
        }
    </div>
    <div  className='w-[15rem] px-5 py-2 text-center shadow-2xl rounded-xl bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white'>
        <h1>Browse all challenges</h1>
    </div>
    </div>
  
  )
}

export default MyChallenges