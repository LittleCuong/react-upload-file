import { defineFunction } from "@aws-amplify/backend";

export const lambdaHTTP = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: "lambda-http",
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: "./handler.ts",
});
