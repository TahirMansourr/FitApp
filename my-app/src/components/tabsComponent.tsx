import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import PostCard from './postComponents/postCard'
import { currentUser } from '@clerk/nextjs'
import PathnameComponent from './pathnameComponent'
import ChallengeCard from './challengesComponents/ChallengeCard'

const TabsComponent = async ({passedUser , shouldDelete} : {passedUser : any , shouldDelete : boolean}) => {

  const user = await currentUser()
  if(!user) return null
 
  return (
    <div>
        <Tabs defaultValue="Posts">
            <div className="mx-auto w-fit">
            <TabsList className=' mx-auto'>
                <TabsTrigger value="Posts">{passedUser.Posts.length} Posts </TabsTrigger>
                <TabsTrigger value="CompletedChallenges">Completed Challenges</TabsTrigger>
                <TabsTrigger value="createdChallenges">created Challenges</TabsTrigger>
            </TabsList>
            </div>
            
            <TabsContent value="Posts" className=' w-full'>
            <div className=' mx-auto'>
                {
                passedUser.Posts.length > 0 ? 
                passedUser.Posts.map((item : any , index :number) => (
                    <PostCard
                    key={index}
                    author = {passedUser}
                    text = {item.text}
                    children = {item.children}
                    id = {item._id as string}
                    createdAt={item.createdAt}
                    shouldDelete = { shouldDelete}
                    />
                ))
                : <h1>{passedUser.username} {`hasn't posted anything yet`} </h1>
                }
            </div>
            </TabsContent>
            <TabsContent value="CompletedChallenges">
              <div className=' grid grid-cols-3 gap-3 p-6'>
                {/* this is causing a maximum call stack exceeded error */}
              {/* {
                passedUser.completedChallenges.length > 0?
                passedUser.completedChallenges.map((item : any) => (
                  <ChallengeCard obj = {item}/>
                )) : <h1>{passedUser.username} hasn't completed any challenges yet</h1>
              } */}
              </div>
              
            </TabsContent>
            <TabsContent value="createdChallenges">Change your password here.</TabsContent>
        </Tabs>
    </div>
  )
}

export default TabsComponent