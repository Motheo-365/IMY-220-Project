// Motheo Morena u24666981

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();let client;
let db;

export async function connectToDatabase() {
    const uri = process.env.MONGO_URI;

    client = new MongoClient(uri);

    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected to MongoDB");

    // Specify the database name
    db = client.db("astrea");
}

export function getDatabase() {
    if (!db) {
        throw new Error("Database not connected. Call connectToDatabase first.");
    }
    return db;
}