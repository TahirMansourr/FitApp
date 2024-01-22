'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  
 export const challegnArray = [
    <Card className=" shadow-xl dark:shadow-md dark:shadow-white">
        <CardHeader>
            <CardTitle>challenge 1</CardTitle>
            <CardDescription>Core challenge</CardDescription>
        </CardHeader>
        <CardContent>
            <p>100 day core challenge</p>
        </CardContent>
    </Card>,
    <Card>
        <CardHeader>
            <CardTitle>challenge 2</CardTitle>
            <CardDescription>back challenge</CardDescription>
        </CardHeader>
        <CardContent>
            <p>100 day core challenge</p>
        </CardContent>
        {/* <CardFooter>
            <p>Card Footer</p>
        </CardFooter> */}
    </Card>,
    <Card>
        <CardHeader>
            <CardTitle>challenge 3</CardTitle>
            <CardDescription>chest challenge</CardDescription>
        </CardHeader>
        <CardContent>
            <p>100 day chest challenge</p>
        </CardContent>
        {/* <CardFooter>
            <p>Card Footer</p>
        </CardFooter> */}
    </Card>,
    <Card>
        <CardHeader>
            <CardTitle>Challenge 4</CardTitle>
            <CardDescription>leg challege</CardDescription>
        </CardHeader>
        <CardContent>
            <p>100 day leg challenge</p>
        </CardContent>
        {/* <CardFooter>
            <p>Card Footer</p>
        </CardFooter> */}
    </Card>,

  ]