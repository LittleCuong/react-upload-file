import { defineBackend } from "@aws-amplify/backend"
import { data } from './data/resource';
/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({data})

backend.addOutput({
  auth: {
    aws_region: "ap-southeast-1",
    user_pool_id: "ap-southeast-1_Bx9KKRh7y",
    user_pool_client_id: "2d07mgousu6hbtumkv0uktb9n0",
    identity_pool_id: "ap-southeast-1:23751e12-17a0-49c9-b9c6-90bf54ac5919",
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
})