import React from 'react'
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger 
   } from "@/components/ui/dialog"
import CreateChallengeForm from '../forms/createChallengeForm'

const CreateChallenge = ({children} : {children : any}) => {
  return (
    <div>  
        <Dialog>
            <DialogTrigger >
                {children}
            </DialogTrigger>
            <DialogContent className = 'rounded-2xl border border-emerald-50 bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white shadow-xl '>
                <DialogHeader>
                    <DialogTitle>
                        Create a new Challenge
                    </DialogTitle>
                    <div className=" pt-5 pb-3">
                        <CreateChallengeForm />
                    </div>
                    <DialogDescription>
                        After you submit this challenge it will be shared with other users
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default CreateChallenge

  {/* <div className="p-1">
                            <TooltipProvider>
                                <Tooltip>
                                 <TooltipTrigger>
                                     <SiAddthis size={20} />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Create a new challenge</p>
                                  </TooltipContent>
                                </Tooltip>
                               </TooltipProvider>
                             </div> */}