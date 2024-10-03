import { defineAuth } from "@aws-amplify/backend";
// import { customMessage } from "./custom-message/resource";
// import { postConfirmation } from "./post-confimation/resource";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  // groups: ["WEB-USER", "MOBILE-USER"],
  // triggers: {
  //   postConfirmation,
  //   customMessage,
  // },
  // access: (allow) => [allow.resource(postConfirmation).to(["addUserToGroup"])],
});
