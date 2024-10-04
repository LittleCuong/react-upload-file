export function request(ctx) {
  // Extracting arguments from the context
  const { name, price } = ctx.args;

  // Perform any validation or pre-processing if needed
  if (!name || !price) {
    return {
      errorType: "ValidationError",
      errorMessage: "Product name and price are required.",
    };
  }

  // Return the arguments or initialize data for downstream resolvers
  return {
    name,
    price,
  };
}

export const response = (ctx) => {
  // Access the result from the previous step in the pipeline
  const previousResult = ctx.prev.result;

  // Check if the request handler or previous resolvers returned an error
  if (previousResult.errorType) {
    // Return the error message to the client
    return previousResult;
  }

  // Assuming previousResult contains the valid data
  const { name } = previousResult;

  // Populate the fields as per the schema (a list of products and the channelName)
  return {
    product: [name], // Adding the product name to a list, as defined in the schema
    channelName: "DefaultChannel", // You can replace this with logic to fetch the actual channel
  };
};
