import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { lambdaHTTP } from "../functions/lambdaHTTP/resource";

/*== STEP 1 ===============================================================
// Schema definition for Products and Channels
=========================================================================*/
const schema = a.schema({
  // Product type with necessary fields
  Product: a.customType({
    product: a.string().required(), // Assuming product is an array of strings, adjust if necessary
    channelName: a.string().required(),
  }),

  onProductAdd: a
    .subscription()
    .for(a.ref("addProduct")) // Subscribes to the 'publish' mutation
    .handler(
      a.handler.custom({
        entry: "./onProductAdd.js", // Handler for receiving new product
      })
    )
    .authorization((allow) => [allow.publicApiKey()]),

  // Channel model definition
  Channel: a
    .model({
      name: a.string().required(), // Ensure the name field is required
    })
    .authorization((allow) => [allow.authenticated()]),

  // Product creation mutation
  addProduct: a
    .mutation()
    .arguments({
      name: a.string().required(),
      price: a.float().required(), // Assuming price is a float value
    })
    .returns(a.ref("Product"))
    .handler(a.handler.function(lambdaHTTP))
    .authorization((allow) => [allow.authenticated()]),
  // .authorization((allow) => [allow.publicApiKey()]),
});

// Export the schema type
export type Schema = ClientSchema<typeof schema>;

// Define data settings
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
// Generate a data client for frontend use
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // Use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
// Example of how to fetch records and display them in your frontend component
=========================================================================*/

/* 
In a React component, you can use the following snippet in your function's RETURN statement:
const { data: products } = await client.models.Product.list()
return <ul>{products.map(product => <li key={product.id}>{product.name}</li>)}</ul>
*/
