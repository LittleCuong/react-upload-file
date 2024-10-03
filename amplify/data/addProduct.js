export function request(ctx) {
  // Extracting arguments from the context
  const { name, price } = ctx.args;

  // Here you can add any logic to create your product, like saving to a database
  // For demonstration, we will create a product object directly
  const product = {
    product: [`Product Name: ${name}`, `Price: ${price}`], // Customize product fields as needed
    channelName: "Your Channel Name", // Set this to the appropriate channel name
  };

  return product; // Return the product object to match your schema
}

export const response = (ctx) => {
  // Return the product object to the caller
  return ctx.result; // ctx.result should hold the product object returned from the request function
};
