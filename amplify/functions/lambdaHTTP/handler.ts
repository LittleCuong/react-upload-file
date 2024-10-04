import type { Handler } from "aws-lambda";
import { MongoClient } from "mongodb";
import AWS from "aws-sdk";

const uri =
  "mongodb+srv://cuongnguyen:cuong922002@@cluster-thesis.yusph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Thesis"; // MongoDB connection string from environment variables

let cachedDb: any = null;

// Connect to MongoDB (cached connection for performance)
async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  const client = new MongoClient(uri);
  await client.connect();
  cachedDb = client.db("cng_store"); // Replace with your MongoDB database name
  return cachedDb;
}

export const handler: Handler = async (event) => {
  try {
    // Validate the input from the event
    const { name, price } = event.payload; // Ensure this matches your incoming structure
    if (!name || !price) {
      throw new Error("Name and price are required");
    }

    // Connect to MongoDB
    const db = await connectToDatabase();
    const collection = db.collection("product_appsync"); // Your MongoDB collection

    // Insert the new product into the collection
    const newProduct = {
      name,
      price,
      createdAt: new Date().toISOString(),
    };

    await collection.insertOne(newProduct); // Insert into MongoDB

    // Return the newly added product
    return {
      statusCode: 200,
      body: JSON.stringify(newProduct), // Returning product info
    };
  } catch (error: any) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
