'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
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
        username: string;
        frameworks: {
          value: string;
          label: string;
        }[];
        workoutArray: string[];
      };
  
    const form = useForm<useformfields>({
      defaultValues: {
        username: '',
        frameworks: [
          {
            value: 'next.js',
            label: 'Next.js',
          },
          {
            value: 'sveltekit',
            label: 'SvelteKit',
          },
          {
            value: 'nuxt.js',
            label: 'Nuxt.js',
          },
          {
            value: 'remix',
            label: 'Remix',
          },
          {
            value: 'astro',
            label: 'Astro',
          },
        ],
        workoutArray: [],
      },
    });
  
    const onSubmit= (values : any) => {
        // Add additional logic here if needed
        console.log(values);
      };
    
      const handleSelectChange = (selectedValue: string) => {
        console.log(selectedValue);
        
        form.setValue('workoutArray', [...form.getValues('workoutArray'), selectedValue]);
      };
    
      return (
        <div>
          <div>DailyWorkOutForm</div>
    
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        {value || 'Select Workout'}
                      </SelectTrigger>
                      <SelectContent>
                        {form.getValues('frameworks').map((item) => (
                          <SelectItem key={item.value} value={item.value} onClick={() => handleSelectChange(item.value)}>
                            {item.label}
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