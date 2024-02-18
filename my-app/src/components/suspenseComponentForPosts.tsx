import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"


const SuspenseComponentForPosts = () => {
  return (
    <div>
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
    </div>
  )
}

export default SuspenseComponentForPosts