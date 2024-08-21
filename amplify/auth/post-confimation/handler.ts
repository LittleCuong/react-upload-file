import type { PostConfirmationTriggerHandler } from "aws-lambda";
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { env } from "$amplify/env/post-confirmation";

const client = new CognitoIdentityProviderClient();

// add user to group
export const handler: PostConfirmationTriggerHandler = async (event) => {
  switch (event.callerContext.clientId) {
    case "3h8kic6j8kkf5fbibt9j4ji5fp":
      const addUserToWeb = new AdminAddUserToGroupCommand({
        GroupName: env.WEB,
        Username: event.userName,
        UserPoolId: event.userPoolId,
      });
      const responseAddToWeb = await client.send(addUserToWeb);
      console.log("processed", responseAddToWeb.$metadata.requestId);
      return event;
    case "62vsms8vvodbupmj55kb0e801":
      const addUserToMobile = new AdminAddUserToGroupCommand({
        GroupName: env.MOBILE,
        Username: event.userName,
        UserPoolId: event.userPoolId,
      });
      const responseAddToMobile = await client.send(addUserToMobile);
      console.log("processed", responseAddToMobile.$metadata.requestId);
      return event;
    default:
      throw new Error("Invalid App Client ID");
  }
};
