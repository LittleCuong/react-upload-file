import { defineFunction } from "@aws-amplify/backend";

export const postConfirmation = defineFunction({
  name: "post-confirmation",
  environment: {
    WEB: "WEB-USER",
    MOBILE: "MOBILE-USER",
  },
});
