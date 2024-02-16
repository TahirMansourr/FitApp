'use client'
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllChallenges } from "@/lib/actions/ChallengeActions/findAllChallenges";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"


export function ChallengeItem() {
    const [challengeFromDb, setChallengeFromDb] = useState<any[]>([]);

    useEffect(() => {
        async function fetchChallenges() {
            try {
                const fetching = await getAllChallenges();
                setChallengeFromDb(fetching);
                console.log("Challenges fetched:", fetching);
            } catch (error) {
                console.error("Error fetching challenges:", error);
            }
        }

        fetchChallenges();

        // Cleanup function for when the component unmounts
    }, []); // Empty dependency array to run useEffect only once after initial render

    return (
        <>
        <Carousel className="w-full max-w-xs items-center rounded-lg  dark:shadow-lg">
            <CarouselContent>
            {challengeFromDb.length > 0 ? (
                challengeFromDb.map((obj: any, index: number) => (
                    <CarouselItem
                    key={index}
                    className=" p-4 flex justify-center dark:shadow-lg w-full"
                    >
                      <Card key={index} className="shadow-xl bg-[#31304D] text-white dark:shadow-md dark:shadow-white w-full">
                        <CardHeader>
                            <CardTitle>{obj.name}</CardTitle>
                            <CardDescription>Description will be here</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>{obj.body}</p>
                        </CardContent>
                        <CardFooter className=" p-0  mx-auto">Created by {obj.createdBy.username}</CardFooter>
                    </Card>
                    </CarouselItem >
                    
                ))
            ) : (
                <CarouselItem>
                     <Card className="shadow-xl bg-[#31304D] text-white dark:shadow-md dark:shadow-white">
                    <CardHeader>
                        <CardTitle>Placeholder</CardTitle>
                        <CardDescription>Description will be here</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Placeholder</p>
                    </CardContent>
                </Card>
                </CarouselItem>
               
            )}
            </CarouselContent>
        </Carousel>
            
        </>
    );
}
