'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import { ChallengesArray } from "@/DTO"

 export const challegnArray = ChallengesArray.map( (obj , index) => (
    <Card className=" shadow-xl dark:shadow-md dark:shadow-white">
        <CardHeader>
            <CardTitle>{obj.title}</CardTitle>
            <CardDescription>{obj.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <p>{obj.content}</p>
        </CardContent>
    </Card>
 ))

    
    