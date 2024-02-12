'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


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
import { Input } from "@/components/ui/input"
import { Weight } from "lucide-react"



  const CardInputComponent = ({title} : {title :string}) => {

    // const formSchema = z.object({
    //   username: z.string().min(2).max(50),
    //   age : z.number().int(),
    //   weight :z.number().int(),
    //   height : z.number().int()
    // })
    //<z.infer<typeof formSchema>>
    
    const form = useForm({
      // resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        age :0,
        weight : 0,
        height : ''
      },
    })
    
    function onSubmit(values : any) {
      console.log(values)
    }
    

    return (
      <div className=" w-fit">
        <Card className=" ">
        <CardHeader>
            <CardTitle>Please fill in the following fields</CardTitle>
            <CardDescription>make sure all the fields are full</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField

          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" pl-3">Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>weight in KGs</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ًwhat are you interseted in doing</FormLabel>
              <FormControl>
                <Input placeholder="This should be a selectbox ie bulk , cut , loseFat" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
        </CardContent>
        {/* <CardFooter>
            <p>Card Footer</p>
        </CardFooter> */}
        </Card>
      </div>
    )
  }
  
  export default CardInputComponent