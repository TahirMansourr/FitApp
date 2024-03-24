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
   

const MealHistory = () => {
    const [meals, setMeals] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const res = await GetMyMeals();
            setMeals(res);
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
            });
        });
        return groupedMeals;
    };

    return (
        <div className="flex items-center justify-center p-10 pt-20">
            <Suspense fallback={<Loading />}>

                <Table>
                    <TableCaption>A list containing all your meals.</TableCaption>
                    <TableHeader className="r">
                        <TableRow>
                            {/* <TableHead className="w-[100px]">Date</TableHead> */}
                            <TableHead>Time</TableHead>
                            <TableHead>Meal</TableHead>
                            <TableHead className="">Calories</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {meals.length === 0 ? (
                            <TableRow>
                                <TableCell className="font-medium">wait</TableCell>
                                <TableCell>for</TableCell>
                                <TableCell>it</TableCell>
                                <TableCell className="">please</TableCell>
                            </TableRow>
                        ) : (
                            // Render meals grouped by date
                            Array.from(groupMealsByDate()).map(([date, mealGroup]) => (
                                <React.Fragment key={date} >
                                    <TableRow className=" w-full">
                                    <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1" className=" w-full">
                                        <AccordionTrigger>
                                        <TableCell colSpan={8} className="font-medium bg-slate-500 rounded-lg text-center text-white shadow-lg w-full">{date}</TableCell>
                                        </AccordionTrigger>
                                        <AccordionContent className=" w-full">
                                        {mealGroup.map((meal : any) => (
                                        <TableRow key={meal._id}>
                                            <TableCell>{meal.time.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' })}</TableCell>
                                            <TableCell>{meal.meal}</TableCell>
                                            <TableCell>{meal.calories}</TableCell>
                                        </TableRow>
                                    ))}
                                        </AccordionContent>
                                    </AccordionItem>
                                    </Accordion>
                                    </TableRow>
                                   
                                </React.Fragment>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Suspense>
        </div>
    );
};

export default MealHistory;
