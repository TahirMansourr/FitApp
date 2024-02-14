"use server"

import mongoose from 'mongoose'


// const MONGODB_URL = 'mongodb+srv://tahirelmag:auENAPfIqrMxcuaP@cluster0.umwgazw.mongodb.net/'

// export const connectToDB = async ()=>{
//  try {
//     await mongoose.connect(MONGODB_URL)
//     console.log('connected to db')
//  } catch (error) {
//     console.log(error)
    
//  }
// }

let isConnected = false;

export const connectToDB = async () => {
    // mongoose.set("strictQuery" , true)

    // if (!process.env.MONGODB_URL) {
    //     return console.log('Missing MongoDB URL');
    // }

    if (isConnected){ 
         console.log("Connection already established");
         return;
        }

    try {
        await mongoose.connect("mongodb+srv://tahirelmag:auENAPfIqrMxcuaP@cluster0.umwgazw.mongodb.net")
        isConnected = true;
        console.log('MongoDb connected');
        
    } catch (error) {
        console.log(error);
        
    }

    
}

