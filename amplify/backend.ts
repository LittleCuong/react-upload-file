import { defineBackend } from "@aws-amplify/backend";
import { data } from "./data/resource";
import { storage } from "./storage/resource";
import { auth } from "./auth/resource";
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */

const backend = defineBackend({
  auth,
  data,
});

// const httpDataSource = backend.data.addHttpDataSource(
//   "HttpDataSource",
//   "http://localhost:3000/api/product/monitor"
// );
