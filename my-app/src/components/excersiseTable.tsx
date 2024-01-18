import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { AiTwotoneDelete } from "react-icons/ai";

  import React from 'react'
import { Button } from "./ui/button";
  
type Props = {
    obj : (string | number)[],
    deleteItem : Function,
    run : boolean,
    duration : number,
    distance : number,
    calories : number
}
  const ExcersiseTable = ({obj , deleteItem , run  , duration , distance , calories} : Props) => {
    return (
      <div className=" border rounded-xl shadow-xl">
        <Table className="  rounded-xl">
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px] text-center">Excersices</TableHead>
                    {/* <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead> */}
                    </TableRow>
                </TableHeader>
            <TableBody>
                {run ? <TableRow>
                    <TableCell className="font-medium" >Ran {distance} in {duration} mins </TableCell>
                         </TableRow> : null}
                    {obj.map( (item , index) => (
                        <TableRow className=" flex justify-between items-center" key={index}>
                         <TableCell className="font-medium" >{item}</TableCell>
                         <TableCell className="font-medium" >
                            <Button
                            onClick={() => deleteItem(index)}
                            className=" hover:scale-110"
                            >
                             <AiTwotoneDelete size={20} color="red" />
                            </Button>
                            
                        </TableCell>
                         </TableRow>
                    ))}
               
                {/* <TableCell>Paid</TableCell>
                <TableCell>Credit Card</TableCell>
                <TableCell className="text-right">$250.00</TableCell> */}
               
            </TableBody>
        </Table>
      </div>
    )
  }
  
  export default ExcersiseTable