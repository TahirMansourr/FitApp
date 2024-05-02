
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {dark} from "@clerk/themes"
import './globals.css'
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ClerkProvider } from '@clerk/nextjs'
import NavBar from '@/components/NavBar'
import { ThemeProvider } from "@/components/themeProvider"

 
 
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FitApp',
  description: 'An App to track your programs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <ClerkProvider
      appearance={{
        baseTheme : dark
      }}
    >
       <html lang="en">
          <body className={cn(
          "min-h-screen bg-background font-sans antialiased ",
          fontSans.variable
           )}>
            
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
           <NavBar/>
          </ThemeProvider>
          {children}
          <footer className='fixed bottom-0 w-full bg-orange-300 text-center'>This is just an mvp please share your thoughts with me , and thank you in advance for any feedback</footer>
        </body>
       </html>
    </ClerkProvider>
   
  )
}
