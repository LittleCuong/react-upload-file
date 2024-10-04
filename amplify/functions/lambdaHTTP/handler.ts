import type { Handler } from "aws-lambda";
import { MongoClient } from "mongodb";
import AWS from "aws-sdk";

const uri =
  "mongodb+srv://cuongnguyen:cuong922002%40@cluster-thesis.yusph.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Thesis"; // MongoDB connection string from environment variables

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
    const { name, price } = event.arguments; // Ensure this matches your incoming structure
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
      product: [newProduct.name], // Assuming 'product' is an array of product names
      channelName: "DefaultChannel", // Use a real channel name or a default value
    };
  } catch (error: any) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
