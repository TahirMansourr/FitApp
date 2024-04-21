'use client'

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"

const formSchema = z.object({
    caloriesIn : z.coerce.number(),
    caloriesBurnt :z.coerce.number()
})

 const Goalform = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
        
      }

      return(
        <div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between items-center">
                <div className="flex gap-4">
                <FormField
                control={form.control}
                name="caloriesIn"
                render={({ field }) => (
                    <FormItem>
                    <div className="flex items-center gap-2 ">
                    <FormLabel>
                        CalsIn
                    </FormLabel>
                    <FormControl>
                        <Input
                        placeholder="" 
                        className="rounded-xl bg-white shadow-xl placeholder:text-gray text-black text-sm w-16  h-8 " 
                        {...field}
                        />
                    </FormControl>
                    </div>
                    <FormMessage className=" text-red-600" />
                    </FormItem>
                     )}
             />
            <FormField
                control={form.control}
                name="caloriesBurnt"
                render={({ field }) => (
                    <FormItem>
                    <div className="flex items-center gap-2">
                    <FormLabel>
                        CalsBurnt
                    </FormLabel>
                    <FormControl>
                        <Input
                        placeholder="" 
                        className="rounded-xl bg-white shadow-xl placeholder:text-gray text-black text-sm w-16  h-8 " 
                        {...field}
                        />
                    </FormControl>
                    
                    </div>
                    <FormMessage className=" text-red-600" />
                    </FormItem>
                     )}
             />
                </div>
           
                    <Button 
                    type="submit"
                    className=" to-blue-600  rounded-xl"
                    > Set Today's Goals</Button>
            </form>
        </Form>
    </div>
      )
}

export default Goalform;