'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

import { GetMyMeals } from '@/lib/actions/DietActions/getMyMeals'
import React, { Suspense, useEffect, useState } from 'react'
import Loading from "./loading"



const MealHistory =  () => {

    const [meals , setMeals ] = useState<any[]>()
    
    useEffect(()=>{
        async function doAtStart(){
           const res =   await GetMyMeals()
            setMeals(res)
            console.log(res);
            console.log(`this is meals : ${res[0].meals[0].meal}`);
            
            
        }
        doAtStart()
        

    } , [])

  return (
    <div className=" flex items-center justify-center p-10 pt-20">
        <Suspense fallback = {<Loading/>}>
        <Table>
            <TableCaption>A list containing all your meals.</TableCaption>
            <TableHeader className="r">
                <TableRow>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Meal</TableHead>
                <TableHead className="">Calories</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { meals?.length === 0 ? 
                <TableRow>
                <TableCell className="font-medium">wait</TableCell>
                <TableCell>for</TableCell>
                <TableCell>it</TableCell>
                <TableCell className="">please</TableCell>
                </TableRow>
                :
                meals?.map((item) =>(
                    item.meals.map((secondItem : any) =>(
                        <TableRow>
                            <TableCell className="font-medium"> {secondItem.time.toDateString()} </TableCell>
                            <TableCell> {secondItem.time.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' })} </TableCell>
                            <TableCell> {secondItem.meal} </TableCell>
                            <TableCell className="">  {secondItem.calories}</TableCell>
                            </TableRow>
                    ))
                ))
                }
            </TableBody>
        </Table>
        </Suspense>

    </div>
  )
}

export default MealHistory