'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Switch } from "@/components/ui/switch"
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
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import ExcersiseTable from "./excersiseTable"
import { Controller } from "react-hook-form"
import { fromJSON } from "postcss"
  
  type props = {
    dailyWorkoutFormState : boolean,
    setDailyWorkoutFormState : Function
  }


  const DailyWorkOutForm = ({dailyWorkoutFormState , setDailyWorkoutFormState} : props) => {
    const [value, setValue] = React.useState('');
    const [open, setOpen] = React.useState(false)

    type useformfields = {
        run : boolean,
        runningDuration : number,
        runningDistance : number,
        workout : string[],
        todayWorkout : (string | number)[]
        caloriesBurnt: number

      };
  
    const form = useForm<useformfields>({
      defaultValues: {
        run: false,
        runningDuration: 0,
        runningDistance : 0,
        caloriesBurnt : 0,
        workout: [
        ' Chest' ,' Bisceps' ,' Triceps' ,' Back' , 'Shoulders' , 'Legs '
        ],
        todayWorkout : []
      },
    });
  
    React.useEffect(() => {
      form.trigger();
  }, [form.getValues('runningDuration'), form.getValues('runningDistance')]);

  

    const onSubmit= (values : any) => {
        console.log(values);
      };
    
    const handleDelete = ( indextodelete : number) => {
      const newtodayworkout = form.getValues('todayWorkout').filter((_ ,index) => index !== indextodelete)
      form.setValue('todayWorkout', newtodayworkout);
    }
    
      const handleSelectChange = (selectedValue: string) => {
        console.log('i was clicked');
        
        console.log(selectedValue);
        form.setValue('todayWorkout', [
          ...form.getValues('todayWorkout'),
          selectedValue,
        ]);
      };
    
      return (
        <div>
          <div className=" text-center">Today's Workout</div>
    
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="run"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg gap-3  px-4 pt-2">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">did u run today?</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
                )}
              />
            { form.getValues('run')? 
            <div className="  rounded-xl shadow-lg">
              <FormField
                control={form.control}
                name="runningDuration"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Duration</FormLabel>
                    </div>
                    <FormControl>
                      <div className="flex items-center justify-between gap-1">
                      <Controller
                                    render={({ field }) => (
                                        <Input
                                            className="w-12 text-center border-b  "
                                            {...field}
                                        />
                                    )}
                                    name="runningDuration"
                                    control={form.control}
                                />
                        <p>mins</p>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="runningDistance"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg  p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Distance</FormLabel>
                  </div>
                  <FormControl>
                   <div className="flex items-center gap-1">
                   {/* The Controller component is designed to integrate external inputs (like your custom Input component) with react-hook-form. */}
                   <Controller
                                    render={({ field }) => (
                                        <Input
                                            className="w-12 text-center border-b  "
                                            {...field}
                                        />
                                    )}
                                    name="runningDistance"
                                    control={form.control}
                                />
                                </div>
                  </FormControl>
                </FormItem>
                )}
              /> 
              <FormField
                control={form.control}
                name="caloriesBurnt"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg  p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base pr-8"> Calories Burnt</FormLabel>
                  </div>
                  <FormControl>
                   <div className="flex items-center gap-1 pl-4">
                     <Input  className="w-12 text-center border-b  "  {...field}/><p>CAL/Kcal</p></div>
                  </FormControl>
                </FormItem>
                )}
              /> 
            </div>
              : null }
             
                <label className=" pr-3">choose excersises</label>
                  <Popover open={open} onOpenChange={setOpen} >
                  <PopoverTrigger asChild >
                    <Button
                      // variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[200px] justify-between border-b  "
                    >
                      {value
                        ? value
                        : "Select excersise..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 hover:scale-110" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search framework..." />
                      <CommandEmpty>No framework found.</CommandEmpty>
                      <CommandGroup>
                        {form.getValues('workout').map((framework) => (
                          <CommandItem
                            key={framework}
                            value={framework}
                            onSelect={(currentValue) => {
                              setValue(currentValue === value ? "" : currentValue)
                              handleSelectChange(currentValue)
                             
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === framework ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {framework}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>

                  <ExcersiseTable 
                  obj = {form.getValues('todayWorkout')}
                  deleteItem = {handleDelete}
                  run = {form.getValues('run')}
                  duration = {form.getValues('runningDuration')}
                  distance = {form.getValues('runningDistance')}
                  calories = {form.getValues('caloriesBurnt')}                  />
              <Button variant={"secondary"} type="submit" className=" flex">Submit</Button>
            </form>
          </Form>
         
        </div>
      );
  };
  
  export default DailyWorkOutForm;

