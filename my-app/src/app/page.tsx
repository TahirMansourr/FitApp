import Image from "next/image";
import logo_transparent from '../../public/mylogo/logo_transparent.png'
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" bg-gradient-to-r from-black to-slate-800 w-full h-screen">
      <div 
      className="bg-cover bg-center w-full h-full"
      style={{ backgroundImage: `url(${logo_transparent.src})` }}
      >
      <div className="flex justify-end items-center h-screen">
        <div className="flex flex-col text-2xl pr-6 items-center justify-center text-white">
        <h1 > Your one step away From reaching your goal!</h1>
        <Link href={'/onBoarding'}>
        <Button className=" text-2xl px-8 py-3 hover:bg-blue-600 rounded-xl bg-blue-400 mt-4 text-white">Start my App</Button>
        </Link>
        
        </div>         
      </div>
       
      </div>
      
    </div>
    )
}
