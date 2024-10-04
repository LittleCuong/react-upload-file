import { defineBackend } from "@aws-amplify/backend";
import { data } from "./data/resource";
import { auth } from "./auth/resource";
import { lambdaHTTP } from "./functions/lambdaHTTP/resource";
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */

const backend = defineBackend({
  auth,
  data,
  lambdaHTTP,
});

// const httpDataSource = backend.data.addHttpDataSource(
//   "HttpDataSource",
//   "http://localhost:3000/api/product/monitor"
// );
