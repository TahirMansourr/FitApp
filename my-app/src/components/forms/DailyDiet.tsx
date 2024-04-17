'use client'
import React, { useState } from 'react'
import { MdAddBox } from "react-icons/md";
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
              
  
  import { Input } from "@/components/ui/input"
  import { Button } from '../ui/button'
  import RenderBarChart from '../barChart';
  import { createMeal } from '@/lib/actions/DietActions/createMeal';
import LoadingComponent from '../LoadingComponent';
import { FcApproval } from 'react-icons/fc';

  

const DailyDiet = ({setIsBlurred} : {setIsBlurred : Function}) => {
    
    const [loading , setLoading] = useState<boolean>(false)
    const [backresponse , setbackResponse] = useState<{ status: string; message: string; error?: undefined; } | { error: any; status?: undefined; message?: undefined; }>()

    const date = new Date()
    
    type useformfeild = {
        calories : number ,
        meal : string,
        tableContent : {
            meal : string,
            calories : number
        }[]
    }

    const form = useForm<useformfeild>({
        defaultValues : {
            tableContent : []
        }
    })
    
    const onSubmit = async (values : any) => {
      console.log(values);
      setLoading(true)
      await createMeal(values.tableContent).then((res) => setbackResponse(res))
      setLoading(false)
    } 

    const handleChange = () => { 
        console.log('i was clicked')
        const caloriestotable = form.getValues('calories')
        const mealstotable = form.getValues('meal')
        const newItem = { meal : mealstotable , calories : caloriestotable}
        form.setValue('tableContent' , [ ...form.getValues('tableContent') , newItem])
        // this is causing it to rerender everytime i click on the button
        form.trigger()
    }
    
  return (
    <div>

    
      { !backresponse ?   <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
            control={form.control}
            name="meal"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg gap-3  px-4 pt-2">
              <div className="space-y-0.5">
                <FormLabel className="text-base">What did you eat?</FormLabel>
              </div>
              <FormControl>
              <Input
                     className="w-fit border-b " {...field} 
                     />
              </FormControl>
            </FormItem>
            )}
          /><FormField
          control={form.control}
          name="calories"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg gap-3  px-4 pt-2">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Estimated Calories</FormLabel>
            </div>
            <FormControl>
              <Input className="w-fit border-b" {...field} />
            </FormControl>
          </FormItem>
          )}
        />
        <div className=' flex justify-end items-end pr-4'>
        <MdAddBox  size={30} onClick={handleChange}/>
        </div>
        
        <div>
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Meal</TableHead>
                <TableHead>cals</TableHead>
               
                <TableHead className="text-right">Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                { 
                    form.getValues('tableContent')?.map((obj , index) => (
                        <TableRow key={index}>
                        <TableCell className="font-medium">{obj.meal}</TableCell>
                        <TableCell>{obj.calories}</TableCell>
                        <TableCell className="text-right">{`${date.getHours()} ${date.getHours() >= 12 ? 'PM' : 'AM'}`}</TableCell>
                        </TableRow>
                    ))
                }
                
            </TableBody>
            </Table>
        </div>
        <div>
        <Button type="submit" className=" flex mx-auto">
          {loading ? <LoadingComponent LoadingText='Saving your meal'/> : "Save Meal"}
          </Button>
        </div>       
       </form>
    </Form> : 
      <div className=" flex gap-3 items-center">
      <FcApproval size={30}/>
     <div>{backresponse.message}</div>
    </div>}
    </div>

  )
}

export default DailyDiet




 {/* <Drawer onClose={()=>setIsBlurred(false)}>
                <DrawerTrigger>
                <Button onClick={() => setIsBlurred(true)} className=' mx-auto'>See my calorie in and out</Button>
                </DrawerTrigger>
                <DrawerContent >
                    <DrawerHeader>
                    <DrawerTitle >Diet History</DrawerTitle>
                    <DrawerDescription>This chart shows your cals in and out and soon the protien</DrawerDescription>
                    </DrawerHeader>
                    <div className=' flex justify-center items-center'>
                    <RenderBarChart/>
                    </div>
                    
                    <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
                </Drawer> */}