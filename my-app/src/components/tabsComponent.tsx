import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import PostCard from './postComponents/postCard'

const TabsComponent = ({passedUser} : {passedUser : any}) => {
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
                passedUser.Posts.map((item : any) => (
                    <PostCard
                    author = {passedUser}
                    text = {item.text}
                    children = {item.children}
                    id = {item._id as string}
                    createdAt={item.createdAt}
                    />
                ))
                : <h1>{passedUser.username} hasn't posted anything yet </h1>
                }
            </div>
            </TabsContent>
            <TabsContent value="CompletedChallenges">Change your password here.</TabsContent>
            <TabsContent value="createdChallenges">Change your password here.</TabsContent>
        </Tabs>
    </div>
  )
}

export default TabsComponent