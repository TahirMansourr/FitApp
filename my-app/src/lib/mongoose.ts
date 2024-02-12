import mongoose from 'mongoose';

const MONGODB_URL = 'mongodb+srv://tahirelmag:auENAPfIqrMxcuaP@cluster0.umwgazw.mongodb.net/';

let isConnected = false;

export const connectToDB = async () => {
    if (isConnected) { 
        console.log("Connection already established");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URL);
        isConnected = true;
        console.log('MongoDb connected');
    } catch (error) {
        console.log(error);
    }
}

// const {MongoClient} = require('mongodb')

// let dbConnection : any;

// module.exports = {
//     connectToDb : (cb : Function) => {
//         MongoClient.connect(MONGODB_URL)
//          .then( 
//             (client : any) => {
//                 dbConnection = client.db()
//                 return cb()
//                 }
//              )
//           .catch( (err: any) => {
//             console.log(err)
//             return cb(err)
//         })
         
//     },
//     getDb : () => dbConnection
// }
