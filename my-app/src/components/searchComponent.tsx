'use client'
import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { Input } from './ui/input';
import { SearchUser } from '@/lib/actions/userActions/searchUser';
import { Skeleton } from "@/components/ui/skeleton"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  import {
    Card,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';
import LoadingComponent from './LoadingComponent';
  
interface User {
    _id: string;
    username: string;
    image: string;
    // Add other properties if necessary
}

const Search = ({userId} : {userId : string}) => {

    const [search , setSearch] = useState<string>('')
    const [result , setResult] = useState<any[] | undefined>([])
    const [loading , setLoading] = useState<boolean>(false)
    const [isDialogOpen , setIsDialogOpen] = useState<boolean>()
   
    const handleSearch = async (userId : string)=>{
      
        setLoading(true)
       
        const foundUsers = await SearchUser({
            userId,
            pageNumber : 1 ,
            pageSize : 20,
            searchParam : search
        })

        if(foundUsers === undefined){
            setLoading(false);
            return null
        } else if (foundUsers.status === 'success'){
            setResult(foundUsers.users);
            setLoading(false);
            console.log(result);
        } else {
            setLoading(false);
           return null
        }
    }
    const handleCloseDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

  return (
    <div className=' flex items-center gap-2'>
        <Dialog open={isDialogOpen} onOpenChange={()=>handleCloseDialog()} >
            <DialogTrigger>
                <IoIosSearch />
            </DialogTrigger>
                <DialogContent className=' w-[22rem] bg-gradient-to-r  rounded-full border-none'>
                    <DialogHeader>
                    <DialogTitle className=' flex items-center justify-center relative mt-2 p-2 w-[16rem] mx-auto'>
                    <Input 
                        className=' bg-white text-black rounded-xl h-7 placeholder:slate-600 placeholder:font-light'
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder='search for user'
                        />
                    <IoIosSearch 
                        size={24} 
                        onClick={() => handleSearch(userId)}
                        className=' absolute right-3 hover:cursor-pointer'
                        color='blue'
                        />
                    </DialogTitle>
                    <DialogDescription>
                       
                        <Card className='bg-gradient-to-r from-[#161A30] to-[#232e6c] text-white shadow-2xl'>
                            <CardHeader>
                                <CardTitle>
                                    {loading === true ?
                                     <div className="space-y-2">
                                    <LoadingComponent LoadingText='Searching for user...'/>
                                 </div> 
                                 :
                                      result && result.length > 0 ? result?.map((item : User) => (
                                            <div className=' flex gap-3 items-center m-2'>
                                                <Image src={item.image}
                                                 alt = 'profile image'
                                                 width={30}
                                                 height={30}
                                                 className=' rounded-full'
                                                />
                                                <Link href={`/Profile/${item._id}`}>
                                                <h1 onClick={handleCloseDialog}> {item.username} </h1>
                                                </Link>
                                                
                                            </div>
                                        ))
                                        : <h1> No user provided :( </h1>
                                    }
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
        </Dialog>
        
        
    </div>
  )
}

export default Search