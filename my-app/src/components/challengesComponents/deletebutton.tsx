'use client'


import React from 'react'
import { Button } from '../ui/button'
import { DeleteChallenge } from '@/lib/actions/ChallengeActions/deleteChallenge'

const DeletehthisChallenge = ({id} : {id : string}) => {

    async function handleDelete(id : string){
        await DeleteChallenge(id)
    }

  return (
   <Button
   onClick={() => handleDelete(id)}
   >
    delete
   </Button>
  )
}

export default DeletehthisChallenge