import { UserButton } from '@clerk/nextjs'
import  Link  from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
   <div className=' flex justify-between p-4 align-baseline '>
    <div className=' text-xl'>
        FITNESS
    </div>
    <div className=' flex justify-between gap-6'>
        <Link href=''> </Link>
        
        <Link href=''> page1</Link>
        
        <Link href=''> page1</Link>
        
    </div>
    <UserButton/>
   </div>
  )
}

export default NavBar