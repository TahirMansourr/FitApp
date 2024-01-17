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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  


  const DailyWorkOutForm: React.FC = () => {
    const [value, setValue] = React.useState('');

    type useformfields = {
        run : boolean,
        runningDuration : number,
        runningDistance : number,
        workout : string[],
        todayWorkout : string[]
        caloriesBurnt: number

      };
  
    const form = useForm<useformfields>({
      defaultValues: {
        run: false,
        workout: [
        ' Chest' ,' Bisceps' ,' Triceps' ,' Back' , 'Shoulders' , 'Legs '
        ],
        todayWorkout : []
      },
    });
  
    const onSubmit= (values : any) => {
        // Add additional logic here if needed
        console.log(values);
      };
    
      const handleSelectChange = (selectedValue: string) => {
        console.log(selectedValue);
        
        form.setValue('todayWorkout', [...form.getValues('todayWorkout'), selectedValue]);
      };
    
      return (
        <div>
          <div>DailyWorkOutForm</div>
    
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="run"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg  p-4">
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
                  <FormItem className="flex flex-row items-center justify-between rounded-lg  p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">duration</FormLabel>
                  </div>
                  <FormControl>
                   <div className="flex items-center justify-between gap-1"> <Input className=" w-fit max-w-5" {...field}/><p>mins</p></div>
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
                   <div className="flex items-center gap-1"> <Input className=" w-fit max-w-5 max-h-8 rounded-md" {...field}/><p>km</p></div>
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
                   <div className="flex items-center gap-1 pl-4"> <Input className=" w-fit max-w-5" {...field}/><p>CAL/Kcal</p></div>
                  </FormControl>
                </FormItem>
                )}
              /> 
            </div>
              : null }
              <FormField
                control={form.control}
                name="todayWorkout"
                render={({ field }) => (
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        {value || 'Select Workout'}
                      </SelectTrigger>
                      <SelectContent className=" bg-gray rounded-xl">
                        {form.getValues('workout').map((item) => (
                          <SelectItem key={item} value={item} onClick={() => handleSelectChange(item)}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      );
  };
  
  export default DailyWorkOutForm;

{/* <Popover open={open} onOpenChange={setOpen}>
<PopoverTrigger asChild>
    <Button
    variant="outline"
    role="combobox"
    aria-expanded={open}
    className="w-[200px] justify-between"
   // onClick={() => ()}
    >
    {form.control._defaultValues.frameworks?.find((framework) => framework?.value === value)?.label}
    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
</PopoverTrigger>
<PopoverContent className="w-[200px] p-0">
    <Command>
    <CommandInput placeholder="Search framework..." />
    <CommandEmpty>No framework found.</CommandEmpty>
    <CommandGroup>
        {form.control._defaultValues.frameworks?.map((framework : any) => (
        <CommandItem
            key={framework.value}
            value={framework.value}
            onSelect={(currentValue) => {
            setValue(currentValue === value ? "" : currentValue)
            form.control._defaultValues.workoutArray?.push(currentValue)
            setOpen(false)
            }}
        >
            <Check
            className={cn(
                "mr-2 h-4 w-4",
                value === framework.value ? "opacity-100" : "opacity-0"
            )}
            />
            {framework.label}
        </CommandItem>
        ))}
    </CommandGroup>
    </Command>
</PopoverContent>
</Popover> */}