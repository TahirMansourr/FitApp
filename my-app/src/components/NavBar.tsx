import { UserButton, currentUser } from '@clerk/nextjs'
import  Link  from 'next/link'
import React from 'react'
import { ModeToggle } from './themeTogller'
import logo_transparent from '../../public/mylogo/logo_transparent.png'

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { fetchUser } from '@/lib/actions/userActions/fetchUser'
import Search from './searchComponent'
import Image from 'next/image'
 
const NavBar = async () => {

  const user = await currentUser()
  if(!user) return null
  const mongoUser = await fetchUser({userId : user.id})
  if(!mongoUser) return null

  return (
   <div className=' fixed top-0 left-0  w-[95%] z-50 flex justify-between px-6 pt-5 pb-3 
   align-baseline ml-6 shadow-md rounded-2xl mt-3 
   bg-gradient-to-r from-[#161A30] to-[#232e6c]
   bg- text-white dark:bg-gray
    dark:shadow-slate-500 dark:shadow-md '>
      {/* <div class=" from-blue-500 to-blue-400 rounded-full py-2 px-4 text-white hover:bg-gradient-to-l">Shiny Button</div> */}

    {/* <Image
    src={logo_transparent}
    alt='logo'
    width={30}
    height={30}
    /> */}
    <div className=' text-xl'>
        FITNESS APP
    </div>         
    <div className=' flex justify-between gap-6  '>
    <Menubar className=' border-none'>
      <MenubarMenu >
        <MenubarTrigger>Posts</MenubarTrigger>
        <MenubarContent className=' border-none flex flex-col justify-start mt-3 bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white rounded-xl'>
          <MenubarItem className=' hover: cursor-pointer'>
          <Link href={'/createPost'}>
          Create a New Post 
          </Link>
          </MenubarItem>
          <MenubarItem>
          <Link href={'/Posts'}>
              Post Feed 
          </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profile</MenubarTrigger>
        <MenubarContent  className=' border-none flex flex-col justify-start mt-3 bg-gradient-to-br from-[#161A30] to-[#232e6c] text-white rounded-xl'>
          <MenubarItem>
           <Link href = {`/Profile/${mongoUser._id}`}>
             My profile
           </Link>
          </MenubarItem>
          <MenubarItem>
          <Link href = {'/onBoarding'}>
              Manage my profile
          </Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <Link href={'/userProfile'}>
        <MenubarTrigger className='hover: cursor-pointer'>Action Page</MenubarTrigger>
        </Link>
      </MenubarMenu>
    </Menubar>

        
    </div>
    <div className=' flex gap-3 items-center'>
    <Search 
    userId = {mongoUser._id}
    />
    <ModeToggle  />
    <UserButton afterSignOutUrl='/'/>
    </div>
    </div>
  )
}

export default NavBar