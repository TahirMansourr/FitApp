'use client'
import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { getAllChallenges } from "@/lib/actions/ChallengeActions/findAllChallenges";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"
import ChallengeCard from "./challengesComponents/ChallengeCard";
import LoadingComponent from "./LoadingComponent";


export function ChallengeItem() {
    
    const [challengeFromDb, setChallengeFromDb] = useState<any[]>([]);

    useEffect(() => {
        async function fetchChallenges() {
            try {
                const fetching = await getAllChallenges().then((res : any) => {
                    console.log("this is the user Id",res.userId)
                   const filteredChallenges = res.challenges.filter((item : any) => item.participants.userId)
                   return filteredChallenges
                });
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
        <Carousel className="w-full max-w-xs items-center rounded-lg  dark:shadow-lg mb-0 p-0">
            <CarouselContent className=" p-2">
            {challengeFromDb.length > 0 ? (
                challengeFromDb.map((obj: any, index: number) => (
                    <CarouselItem
                    key={index}
                    >
                        <ChallengeCard obj = {obj}/>
                    </CarouselItem >
                ))
            ) : (
                <CarouselItem>
                    <Card className="shadow-xl bg-[#31304D] text-white dark:shadow-md dark:shadow-white flex items-center justify-center">
                        <CardHeader>
                            <LoadingComponent LoadingText="Fetching challenges..."/>
                        </CardHeader>
                    </Card>
                </CarouselItem>
               
            )}
            </CarouselContent>
        </Carousel>
            
        </>
    );
}
