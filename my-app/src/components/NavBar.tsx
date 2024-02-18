'use client'
import { UserButton } from '@clerk/nextjs'
import  Link  from 'next/link'
import React from 'react'
import { ModeToggle } from './themeTogller'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


const NavBar = () => {
  return (
   <div className='flex justify-between px-6 pt-5 pb-3 
   align-baseline mx-6 shadow-md rounded-2xl mt-3 
   bg-gradient-to-r from-[#161A30] to-[#232e6c]
   bg- text-white dark:bg-gray
    dark:shadow-slate-500 dark:shadow-md '>
      {/* <div class=" from-blue-500 to-blue-400 rounded-full py-2 px-4 text-white hover:bg-gradient-to-l">Shiny Button</div> */}

    <div className=' text-xl'>
        FITNESS APP
    </div>
    <div className=' flex justify-between gap-6  '>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem >
          <NavigationMenuTrigger>My profile</NavigationMenuTrigger>
          
          <NavigationMenuContent className=' bg-gray flex flex-col p-5 w-fit   '>
            <NavigationMenuLink>My acheivments</NavigationMenuLink>
            <Link href = '/userProfile'>Profile</Link>
            <NavigationMenu>My Personal Records</NavigationMenu>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

        
    </div>
    <div className=' flex gap-3'>
    <ModeToggle  />
    <UserButton afterSignOutUrl='/'/>
    </div>
    </div>
  )
}

export default NavBar