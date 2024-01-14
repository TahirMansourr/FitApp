import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import React from 'react'
  
  const ChallengeCard = () => {
    return (
      <div className=" ">
        <Card className=" ">
        <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Card Content</p>
        </CardContent>
        <CardFooter>
            <p>Card Footer</p>
        </CardFooter>
        </Card>
      </div>
    )
  }
  
  export default ChallengeCard