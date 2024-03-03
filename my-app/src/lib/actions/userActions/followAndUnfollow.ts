'use server'

import { connectToDB } from "@/lib/mongoose"
import { currentUser } from "@clerk/nextjs"
import { fetchUserWithMongoId } from "./findMongoUser"
import User from "@/lib/models/userSchema"

export async function Follow({following ,follower} : {following : any , follower : any}) {
    try {
        connectToDB()

        const followers = await User.findById(follower);
        const followings = await User.findById(following);

        if (!follower || !following) {
            throw new Error('User not found');
        }

        // Update the follower and following arrays
        if (!followers.followers.includes(following)) {
            followers.followers.push(following);
        }
        if (!followings.following.includes(follower)) {
            followings.following.push(follower);
        }

        // Save the updated users
        await followers.save();
        await followings.save();

      

    } catch (error : any) {
        throw new Error(`Error at followandUnfollow.ts : ${error}`)
    }
}

export async function UnFollow() {
    try {
        connectToDB()

        const user = currentUser()
        if(!user) return null;

    } catch (error : any) {
        throw new Error(`Error at followandUnfollow.ts : ${error}`)
    }
}