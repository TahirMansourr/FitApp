'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GetMyMeals } from '@/lib/actions/DietActions/getMyMeals';
import React, { Suspense, useEffect, useState } from 'react';
import Loading from "./loading";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar"

const MealHistory = () => {
    const [meals, setMeals] = useState<any[]>([]);
    const [selectedDay , setSelectedDay] = useState<{meal : string , time : Date ,calories:number}[]>()
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    const [sortedMeals , setSortedMeals] = useState<Map<any , any>>()

    useEffect(() => {
        async function fetchData() {
            const res = await GetMyMeals();
            setMeals(res);
            console.log(res);          
        }
        fetchData();
    }, []);

    // Function to group meals by date
    const groupMealsByDate = () => {
        const groupedMeals = new Map();
        meals.forEach((item) => {
            item.meals.forEach((meal : any) => {
                const date = meal.time.toDateString();
                if (!groupedMeals.has(date)) {
                    groupedMeals.set(date, []);
                }
                groupedMeals.get(date).push(meal);              
                //  console.log('this is your grouped meals ', groupedMeals) ;
            });
        });
        //setSortedMeals(groupedMeals)
        return groupedMeals;
    };

    const getMealsForSelectedDate = (date : Date | undefined) => {
        // console.log(groupMealsByDate());
         const requiredDay = groupMealsByDate().get(date?.toDateString()) 
        //  console.log(requiredDay); 
         if(!requiredDay) console.log('no records for this day');
         setSelectedDay(requiredDay)
        //  console.log('this is the selected day' , selectedDay);
        
    }

    return (
        <div className="pt-28  flex justify-around items-center bg-white dark:bg-black dark:text-white min-h-screen">
            <div className="flex flex-col ">
                <ScrollArea className=" h-96">
                <Suspense fallback={<Loading />}>
                        {meals.length === 0 ? (
                           ' you consumed nothing on this day hahaha'
                        ) : (
                            // Render meals grouped by date
                            Array.from(groupMealsByDate()).map(([date, mealGroup]) => (
                                <React.Fragment key={date} >
                                    <Accordion type="single" collapsible className=" w-60">
                                    <AccordionItem value="item-1" className=" w-full border-none">
                                        <AccordionTrigger>
                                        <TableCell colSpan={8} className="font-medium bg-gradient-to-r from-[#161A30] to-[#232e6c] rounded-2xl text-center text-white shadow-lg w-full">{date}</TableCell>
                                        </AccordionTrigger>
                                        <AccordionContent className=" w-full">
                                        <Table>
                                        <TableHeader className="r">
                                            <TableRow>
                                                {/* <TableHead className="w-[100px]">Date</TableHead> */}
                                                <TableHead>Time</TableHead>
                                                <TableHead>Meal</TableHead>
                                                <TableHead>Calories</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                        {mealGroup.map((meal : any) => (
                                        <TableRow key={meal._id}>
                                            <TableCell>{meal.time.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' })}</TableCell>
                                            <TableCell>{meal.meal}</TableCell>
                                            <TableCell>{meal.calories}</TableCell>
                                        </TableRow>
                                    ))}
                                        </TableBody>
                                        </Table>
                                        </AccordionContent>
                                    </AccordionItem>
                                    </Accordion>
                                </React.Fragment>
                            ))
                        )}
            </Suspense>
                </ScrollArea>
           
            </div>
            {   selectedDay ?  <div>
                <ScrollArea className=" h-96">
                <Accordion type="single" collapsible className=" w-60">
                                    <AccordionItem value="item-1" className=" w-full border-none">
                                        <AccordionTrigger>
                                        <TableCell colSpan={8} className="font-medium bg-gradient-to-r from-[#161A30] to-[#232e6c] rounded-2xl text-center text-white shadow-lg w-full">
                                            {selectedDay[0].time.toDateString()}
                                        </TableCell>
                                        </AccordionTrigger>
                                        <AccordionContent className=" w-full">
                                        <Table>
                                        <TableHeader className="r">
                                            <TableRow>
                                                {/* <TableHead className="w-[100px]">Date</TableHead> */}
                                                <TableHead>Time</TableHead>
                                                <TableHead>Meal</TableHead>
                                                <TableHead>Calories</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                        {selectedDay?.map((meal : any) => (
                                        <TableRow key={meal._id}>
                                            <TableCell>{meal. time ? meal.time.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' }) : 'No records for this day'}</TableCell>
                                            <TableCell>{meal.meal}</TableCell>
                                            <TableCell>{meal.calories}</TableCell>
                                        </TableRow>
                                    ))}
                                        </TableBody>
                                        </Table>
                                        </AccordionContent>
                                    </AccordionItem>
              </Accordion>
                </ScrollArea>
             
              </div> : 
              <div className="font-medium bg-gradient-to-r from-[#161A30] to-[#232e6c] rounded-2xl text-center text-white shadow-lg p-4">
                No recorded meals for this day
              </div> }
            <div className="flex flex-col gap-2 font-bold">
                <div className=" pl-2">Pick a day</div>
            <Calendar
               mode="single"
               selected={date}
               onSelect = {(selectedDate) => {
                setDate(selectedDate); // Set the selected date
                getMealsForSelectedDate(selectedDate); // Fetch meals for the selected date
            }}
               className="rounded-xl bg bg-gradient-to-r from-[#161A30] to-[#232e6c] text-white "
             /> 
            </div>          
        </div>
    );
};

export default MealHistory;
