'use client'

import { DeletePost } from '@/lib/actions/postActions/deletePost'
import React from 'react'
import { Button } from '../ui/button'

const DeleteButton = ({id} : {id : string}) => {

    async function handleDelete(id : string){
        await DeletePost(id)
    }

  return (
   <Button
   onClick={() => handleDelete(id)}
   >
    delete
   </Button>
  )
}

export default DeleteButton