'use client'

import React from 'react'
import { Button } from './ui/button'
import { completeChallenge } from '@/lib/actions/ChallengeActions/completeChallenge'

const BFC = ( challengeId : any) => {

    async function handleComplete(item : any){
        await completeChallenge(item)
    }

  return (
    <div>
        <Button 
        className='  bg-gradient-to-br from-green-700 to-green-500  rounded-xl shadow-xl'
        onClick={ () => handleComplete(challengeId)}
        >
            completed
        </Button>
    </div>
  )
}

export default BFC