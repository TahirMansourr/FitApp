import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { games?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    dotenv.config();
    
    if (!process.env.MONGODB_URL) {
        throw new Error('Missing MongoDB URL');
    }

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.MONGODB_URL);
            
    await client.connect();
    
    if (!process.env.MONGODB_MONGODB_WEBSITE_NAME) {
        throw new Error('Missing MONGODB_Collection_NAME');
    }

    const db: mongoDB.Db = client.db(process.env.MONGODB_WEBSITE_NAME);

    if (!process.env.MONGODB_Collection_NAME) {
        throw new Error('Missing MONGODB_WEBSITE_NAME');
    }

   
    const gamesCollection: mongoDB.Collection = db.collection(process.env.MONGODB_Collection_NAME);
 
  collections.games = gamesCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`);
 }