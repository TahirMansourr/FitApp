import { UserButton } from '@clerk/nextjs'
import  Link  from 'next/link'
import React from 'react'
import { ModeToggle } from './themeTogller'

const NavBar = () => {
  return (
   <div className=' flex justify-between px-6 pt-5 pb-3 align-baseline mx-6 shadow-md rounded-2xl mt-3 bg-opacity-10 dark: bg-white dark:shadow-slate-500 dark:shadow-md '>
    <div className=' text-xl'>
        FITNESS APP
    </div>
    <div className=' flex justify-between gap-6 '>
        <Link href=''> </Link>
        
        <Link href=''> page1</Link>
        
        <Link href=''> page1</Link>
        <Link href=''> page1</Link>
        
    </div>
    <div className=' flex gap-3'>
    <ModeToggle  />
    <UserButton/>
    </div>
    </div>
  )
}

export default NavBar