import { defineBackend } from "@aws-amplify/backend"
import { data } from './data/resource';
// import { storage } from "./storage/resource";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */

const backend = defineBackend({data})

backend.addOutput({
    auth: {
        aws_region: "ap-southeast-1",
        user_pool_id: "ap-southeast-1_v4oJLyFSR",
        user_pool_client_id: "3h8kic6j8kkf5fbibt9j4ji5fp",
        identity_pool_id: "ap-southeast-1:a31f61e0-4c4c-46f7-ab07-dbd6d1d46744",
        username_attributes: ["email"],
        standard_required_attributes: ["email"],
        user_verification_types: ["email"],
        unauthenticated_identities_enabled: true,
        password_policy: {
          min_length: 8,
          require_lowercase: true,
          require_uppercase: true,
          require_numbers: true,
          require_symbols: true,
        }
    },
    storage: {
      aws_region: "ap-southeast-1",
      bucket_name: "amplify-d3j0bjuzqjjeuu-ma-uploadfilecuongawsbucket-kndw2wek9uxv"
    },
  });